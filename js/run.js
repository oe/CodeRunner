if ('undefined' == typeof(demos)) {
	var body = document.getElementsByTagName('body')[0]
	body.style.backgroundColor = 'red'
	body.style.textAlign = 'center'
	body.innerText = 'Can\'t fetch demos'
} else {
	var select = document.getElementById('select-list'),
		applyBtn = document.getElementById('apply-btn'),
		codeAr = document.getElementById('codearea'),
		preview = document.getElementById('preview'),
		zenmode = document.getElementById('zenmode'),
		body = document.body,
		saveFileBtn = document.getElementById('save-file'),
		codeEle = document.getElementById('code'),
		isZenmode = false,
		code = ace.edit("code")

	code.setTheme("ace/theme/clouds_midnight");
	code.getSession().setMode("ace/mode/javascript");
	select.onchange = changeCode
	applyBtn.onclick = applyDemo
	preview.onload = execDemo
	zenmode.onclick = onZenmode

	code.commands.addCommand({
		name: 'escape',
		bindKey: {win: 'Esc',  mac: 'Esc'},
		exec: function(editor) {
			if (isZenmode) {
				onZenmode()
			}
		}
	})

	// code.commands.addCommand({
	// 	name: 'save',
	// 	bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
	// 	exec: function(editor) {
	// 		alert('save...')
	// 		saveFileBtn.click()  
	// 	}
	// });

	Downloadify.create('save-file',{
	  filename: function(){
	    return 'YourCode.js'
	  },
	  data: function(){ 
	    return code.getValue()
	  },
	  // onComplete: function(){ 
	  //   alert('Your File Has Been Saved!'); 
	  // },
	  // onCancel: function(){ 
	  //   alert('You have cancelled the saving of this file.');
	  // },
	  onError: function(){ 
	    alert('You must put something in the File Contents or there will be nothing to save!'); 
	  },
	  swf: 'media/downloadify.swf',
	  downloadImage: '',
	  width: 100,
	  height: 30,
	  transparent: true,
	  append: false
	});

	;(function init (sel,arr,code) {
		var i, opts = ''
		for(i in arr){
			opts += '<option value="' + i + '">' + i + '</option>'
		}
		sel.innerHTML = opts
		code.setValue(unescape(arr[select.value]))
	})(select,demos,code)

	function changeCode (e) {
		if(!demos[select.value]) {
			alert('No demo here! You can choose others.')
			return
		}
		code.setValue(unescape(demos[select.value]))
		applyDemo()
	}

	function applyDemo (e) {
		preview.src = './demo-frame.html'
	}

	function execDemo (e) {
		preview.contentWindow.loadInlineExample(code.getValue(),{})
		document.body.scrollTop = document.body.scrollHeight
	}

	function onZenmode () {
		if (isZenmode) {
			isZenmode = false
			codeAr.style.cssText = 'height: 400px; width: 900px; padding: 0;'
			codeEle.style.cssText = 'font-size: 12px;'
			body.style.cssText = 'overflow: scroll; padding: 10px;'
			code.resize()
			code.focus()
		} else {
			isZenmode = true
			codeAr.style.cssText = 'height: 100%; width: 100%; padding: 10px;'
			codeEle.style.cssText = 'font-size: 18px;'
			body.style.cssText = 'overflow: hidden; padding: 0;'
			code.resize()
			code.focus()
		}
	}

	
}