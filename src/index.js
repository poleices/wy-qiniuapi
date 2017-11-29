/**
 * Created by evan on 2017/11/27.
 */

// export { QiniuJsSDK, FileProgress }
import plupload from "plupload"
import QiniuJsSDK from "./js/qiniu"
import FileProgress from "./js/ui"
import $ from "jquery"

;(function($, window, document,undefined) {
	//定义 WYUpLoader 的构造函数
	var WYUpLoader = function(ele, opt) {
		var _this=this;
		this.$element = ele;
		this.Qiniu={};
		this.defaults = {
			browse_button: this.$element.attr('id'),
			// container: 'container',
			// drop_element: 'container',
			max_file_size: '100mb',
			// flash_swf_url: 'js/plupload/Moxie.swf',
			dragdrop: false,
			unique_names:true,
			chunk_size: '4mb',
			get_new_uptoken: false,
			filters: [{title: "Image files",extensions: "jpg,jpeg,gif,png,pdf"}],
			uptoken_url: 'http://127.0.0.1:19110/uptoken',
			domain: 'http://ozrjg7ir9.bkt.clouddn.com/',
			progresspanel:'fsUploadProgress',
			disable_statistics_report:true,
			init: {
				'FilesAdded': function (up, files) {
					$('table').show();
					$('#success').hide();
					plupload.each(files, function (file) {
						var progress = new FileProgress(file, _this.options.progresspanel,_this.Qiniu);
						progress.setStatus("等待...");
					});
				},
				'BeforeUpload': function (up, file) {
					var progress = new FileProgress(file, _this.options.progresspanel,_this.Qiniu);
					var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
					if (up.runtime === 'html5' && chunk_size) {
						progress.setChunkProgess(chunk_size);
					}
				},
				'UploadProgress': function (up, file) {
					var progress = new FileProgress(file, _this.options.progresspanel,_this.Qiniu);
					var chunk_size = plupload.parseSize(this.getOption('chunk_size'));

					progress.setProgress(file.percent + "%", file.speed, chunk_size);
				},
				'UploadComplete': function () {
					$('#success').show();
				},
				'FileUploaded': function (up, file, info) {
					var progress = new FileProgress(file,_this.options.progresspanel,_this.Qiniu);
					progress.setComplete(up, info);
				}
			}
		};
		if(!!this.$element.data("extensions")){
			this.defaults.filters[0].extensions=this.$element.data("extensions");
		}

		this.options = $.extend({}, this.defaults,this.$element.data(),opt)
		console.log(this.options);
	}
	//定义 init 的方法
	WYUpLoader.prototype = {
		init: function() {
			this.Qiniu=new QiniuJsSDK();
			return this.Qiniu.uploader(this.options);
		}
	}
	//在插件中使用 WYUpLoader 对象
	$.fn.upLoader = function(options) {
		var uploader=new WYUpLoader(this,options);
		return uploader.init();
	}
})($, window, document);