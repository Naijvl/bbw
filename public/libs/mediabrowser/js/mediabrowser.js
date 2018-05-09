/**
 * 图片管理对话框。
 *
 * ToDo (日后要完善的功能):
 *
 * 1. 内部使用 item 来组织每个项目，必要时才更新 DOM
 *
 */


(function($){

	"use strict";


	var defaults = {

        /**
         * 是否允许多重选择.
         */
        multipleSelection: true,


        /**
         * 单击某个项目时的回调.
         * @param id
         * @param item
         * @param e
         * @returns {boolean}
         */
		onItemClicked: function(id, item, e) { return true; },


		/**
		 * 当单击“删除”按钮时的回调
		 * @param jQuery    item
		 * @param Event     e
		 */
		onChecked: function(item, e) { return true; },


		/**
		 * 当单击“删除”按钮时的回调
		 * @param jQuery    item
		 * @param Event     e
		 */
		onRemoveItem: function(btn, e) { return true; },



        /**
         * 当单击右上角的 X，或单击灰色背景关闭对话框时调用
         */
        onClose: function() { return true; },



        /**
         * 当单击右下角的确定按钮时调用
         */
        onOk: function() { return true; }

	};



	/**
	 * 图像管理对话框。
	 *
	 * @param    string    selector
	 * @param    array     options
	 */
	function MediaBrowser(selector, options)
	{
		this.options = $.extend( {}, defaults, options );
        this.tempOptions = {};

		this.$container = $(selector);
		this.$grid      = this.$container.find('.grid');
		this.$toolbar   = this.$container.find('.toolbar');
        this.$detail    = this.$container.find('.detail');

		this.selection = [];
        this.itemMaps  = [];

		this._init();
	}


	MediaBrowser.prototype = {

		_init: function() {
			var _this = this;

            this.$container.find('.modal-header .close').click(function(e){
                _this.close();

                if (_this.tempOptions.hasOwnProperty('onOk')) {
                    _this.tempOptions.onOk.call(this);
                    _this.tempOptions = {};
                } else {
                    _this.options.onClose.call(this);
                }
            });

            this.$container.find('.modal-footer button').click(function(e){
                _this.close();

                if (_this.tempOptions.hasOwnProperty('onOk')) {
                    _this.tempOptions.onOk.call(this);
                    _this.tempOptions = {};
                } else {
                    _this.options.onOk.call(this);
                }
            });

            this.$container.click(function(e){
                if (this === e.target) {
                    _this.close();
                }
            });

			this.$grid
				.on('click', '.checkbox', function(e){
					_this._onItemCheckboxClicked(this, e);
					return false;
				})
				.on('click', '.item', function(e){
					_this._onItemClicked(this, e);
				})
				;

			this.$toolbar.find('.btn-remove').click(function(e){
				e.preventDefault();
				_this._onBtnRemove(this, e);
			});

            // 构造 ID 到项目的映射以方便查找. 尽量别透过 HTML 中的元素 ID 添加
            // "item-id-xyz" 这样的方式组织或查找.
            var i, $the_item, $items = this.$grid.find('.item');

            for (i=0; i<$items.length; i++) {
                $the_item = $($items[i]);
                this.itemMaps[$the_item.data('id')] = $the_item;
            }
		},



		/**
		 * 处理复选框单击消息.
		 */
		_onItemCheckboxClicked: function(elem, e){
			var $item = $(elem).closest('.item');

			if ($item.hasClass('checked')) {
				$item.removeClass('checked');

				this.deselect($item.data('id'));
			} else {
				$item.addClass('checked');
				this.selection.push($item.data('id'));
			}

			this.options.onChecked.call(this, $(elem), e);
		},



		/**
		 * 处理图像本身的单击事件.
		 */
		_onItemClicked: function(elem, e){
			this.clearSelection();

			var $item = $(elem).closest('.item'),
                id = $item.data('id');

			$item.addClass('checked');
			this.selection.push(id);

			this.options.onItemClicked.call(this, id, $(elem), e);
		},



		/**
		 * 单击工具栏上的“删除”按钮.
		 */
		_onBtnRemove: function(elem, e){
			if (0 === this.selection.length) {
				alert('请先选择要删除的图片');
				return;
			}

			if (!confirm('确定要删除指定 ' + this.selection.length + ' 张图片吗？被删除的图片将无法恢复！')) {
				return;
			}

			this.options.onRemoveItem.call(this, elem, e);
		},



		/**
		 * 取消选定指定的 ID.
		 */
		deselect: function(id) {
			if (0 === this.selection.length) {
				return;
			}

			var i = this.selection.length - 1;

			for (; i>=0; i--) {
				if (id === this.selection[i]) {
					this.selection.splice(i, 1);
					break;
				}
			}

            if (0 === this.selection.length) {
                this.$detail.empty();
            }
		},



		/**
		 * 清除选集 (所有选定的项目).
		 */
		clearSelection: function() {
			this.selection.length = 0;
			this.$grid.find('.checked').removeClass('checked');
			$(this).closest('.item').addClass('checked');
		},



        /**
         * 删除选定的项目.
         *
         * @param items
         */
        removeItem: function(items) {

            var ids = [];

            if ('number' === typeof items) {
                ids.push(items);
            }

            var id, i;

            for (i=0; i<items.length; i++) {

                id = items[i];

                if (this.itemMaps.hasOwnProperty(id)) {
                    this.itemMaps[id].remove();
                    this.deselect(id);
                    delete this.itemMaps[id];
                }
            }
        },



        /**
         * 弹出对话框.
         * @param options    Object    参数定义见下
         *                             'activeTab'   设置为 'upload' 打开上传标签; 'explore' 则打开浏览文件标签.
         */
		modal: function(options) {
            var opt = ('object' === typeof options ? options : {} );

            $.extend(this.tempOptions, options);

            if (opt.hasOwnProperty('activeTab')) {
                this.$container.find(".nav-tabs a[href='#media-browser-" + options['activeTab'] + "']").trigger('click');
            }

            this.$container.show();
		},



        /**
         * 关闭对话框.
         */
        close: function(){
            this.$container.hide();
        }
	};



	if ('undefined' === typeof window.MediaBrowser) {
		window.MediaBrowser = MediaBrowser;
	}


})(jQuery);
