import plupload from "plupload"
import QiniuJsSDK from "./qiniu"
import FileProgress from "./ui.js"

// window.moxie=moxie;
// window.plupload=plupload;
window.$=$;
//
import $ from "jquery"

// let WYQiNiuUpFile=function (op) {
// 	let that=this;
// 	this.option = {
// 		runtimes: 'html5,flash,html4',
// 		browse_button: 'upfile',
// 		container: 'container',
// 		// drop_element: 'container',
// 		max_file_size: '100mb',
// 		// flash_swf_url: 'js/plupload/Moxie.swf',
// 		dragdrop: true,
// 		chunk_size: '4mb',
// 		uptoken_url: 'http://127.0.0.1:19110/uptoken',
// 		domain: 'http://ozrjg7ir9.bkt.clouddn.com/',
// 		auto_start: true,
// 		progresspanel:'fsUploadProgress',
// 		init: {
// 			'FilesAdded': function (up, files) {
// 				$('table').show();
// 				$('#success').hide();
// 				plupload.each(files, function (file) {
// 					console.log('----file---');
// 					console.log(file);
// 					var progress = new FileProgress(file, that.option.progresspanel);
// 					progress.setStatus("等待...");
// 				});
// 			},
// 			'BeforeUpload': function (up, file) {
// 				var progress = new FileProgress(file, that.option.progresspanel);
// 				var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
// 				if (up.runtime === 'html5' && chunk_size) {
// 					progress.setChunkProgess(chunk_size);
// 				}
// 			},
// 			'UploadProgress': function (up, file) {
// 				var progress = new FileProgress(file, that.option.progresspanel);
// 				var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
//
// 				progress.setProgress(file.percent + "%", file.speed, chunk_size);
// 			},
// 			'UploadComplete': function () {
// 				$('#success').show();
// 			},
// 			'FileUploaded': function (up, file, info) {
// 				var progress = new FileProgress(file, that.option.progresspanel);
// 				console.log('--------info*2----');
// 				console.log(info.response.toString());
// 				progress.setComplete(up, info);
// 			},
// 			'Error': function (up, err, errTip) {
// 				$('table').show();
// 				var progress = new FileProgress(err.file, that.option.progresspanel);
// 				progress.setError();
// 				progress.setStatus(errTip);
// 			}
// 		}
// 	};
// 	return new QiniuJsSDK().uploader(Object.assign({},this.option,op));
// };
//
// module.exports=WYQiNiuUpFile;
//
$(function () {
	let instance=new QiniuJsSDK();
	let dd=instance.uploader({
		browse_button: 'upfile',
		container: 'container',
		// drop_element: 'container',
		max_file_size: '100mb',
		// flash_swf_url: 'js/plupload/Moxie.swf',
		dragdrop: false,
		chunk_size: '4mb',
		filters: [{title: "Image files",extensions: "jpg,gif,png"}],
		uptoken_url: 'http://127.0.0.1:19110/uptoken',
		domain: 'http://ozrjg7ir9.bkt.clouddn.com/',
		progresspanel:'fsUploadProgress',
		init: {
			'FilesAdded': function (up, files) {
				$('table').show();
				$('#success').hide();
				plupload.each(files, function (file) {
					console.log('----file---');
					console.log(file);
					var progress = new FileProgress(file, 'fsUploadProgress');
					progress.setStatus("等待...");
				});
			},
			'BeforeUpload': function (up, file) {
				var progress = new FileProgress(file, 'fsUploadProgress');
				var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
				if (up.runtime === 'html5' && chunk_size) {
					progress.setChunkProgess(chunk_size);
				}
			},
			'UploadProgress': function (up, file) {
				var progress = new FileProgress(file, 'fsUploadProgress');
				var chunk_size = plupload.parseSize(this.getOption('chunk_size'));

				progress.setProgress(file.percent + "%", file.speed, chunk_size);
			},
			'UploadComplete': function () {
				$('#success').show();
			},
			'FileUploaded': function (up, file, info) {
				var progress = new FileProgress(file, 'fsUploadProgress');
				console.log('--------info*2----');
				console.log(info.response.toString());
				progress.setComplete(up, info);
			}
		}
	});
});