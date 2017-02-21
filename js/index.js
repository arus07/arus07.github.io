$('.time-picker').datetimepicker(
  {
    locale: 'zh-cn',
    icons:{
      time:"iconfont icon-clock",
      previous: 'iconfont icon-arrow2',
      next: 'iconfont icon-arrow3',
      date: 'iconfont icon-calendar',
      up: 'iconfont icon-arrow5',
      down: 'iconfont icon-arrow4',
    }
  }
)

$('[data-toggle="tooltip"]').tooltip({
  container:'.jkcontainer'
})

Waves.attach('.button3d-confirm,.button3d-print', ['waves-light'])
Waves.init()
$('[data-animate=in]').addClass('ng-fadeInLeft2 ng-enter')

$('.app').on("click", "[data-name^=text]", onEdit)
  .on("click","[data-name=modal]", onCreateTextModal)
  .on("click","[data-name=modal1]", onCreateCompanyModal)
  .on("click","[data-name=modal2]", onCreateImgModal)
  .on("click","[data-name=modal3]", onShowconfirm)
  .on('click',"#text-to-do",scanforactive)
  .on("click","[data-name=toastr1]", function(){toastr.success("成功处理信息！")})
  .on("click","[data-name=toastr2]", function(){toastr.warning("警告处理信息！")})
  .on("click","[data-name=toastr3]", function(){toastr.error("错误处理信息！")})

function onEdit(){
  var action= this.dataset.name.split( '-' )[1]
  document.execCommand(action, false, this.dataset.value)

  if(action == 'fontName'){
    $('#fontFamily').html(this.dataset.value)
  }
  if(action == 'fontSize'){
    $('#fontSize').html(fontsizeTrans(this.dataset.value))
  }
}

function fontsizeTrans (value) {
  switch(value){
    case '1':
      return '10'
      break
    case '2':
      return '12'
      break
    case '3':
      return '16'
      break
    case '4':
      return '18'
      break
    case '5':
      return '24'
      break
    case '6':
      return '32'
      break
    case '7':
      return '48'
      break
  }
}

function onCreateTextModal(){

  var sel = window.getSelection()
  var storeSel = sel.getRangeAt(0).cloneRange()

  $('#addHref')
    .modal("show")
    .on('click','[data-action=record]',onRecordRange)
    .on('input', '#anchor', onCopy)

  function onRecordRange(){
    $(this).parents(".modal").modal("hide")
    sel.addRange(storeSel)
    document.execCommand('createLink', false, this.dataset.value)
  }

  function onCopy(){
    $('#anchor2').attr('data-value',$(this).val())
  }

}

function onCreateCompanyModal(){
  $('#addCompany').modal("show")
}

function onCreateImgModal(){

  var sel = window.getSelection()
  var storeSel = sel.getRangeAt(0).cloneRange()

  $('#addImg')
    .modal("show")
    .on('click','[data-action=insert]',onInsertImg)
    .on('dragover','.textedit3',dragOver)
    .on('drop','.textedit3',fileSelect)

  function onInsertImg(){
    $(this).parents(".modal").modal("hide")
    var address = $('#address').val()
    // 这步主要是点开新的modal之后selection会没掉，因此调用之前存储的range并赋值
    // 如果再出现discontiguous selection 的错误提示。试试清空sel或者按原来的方法的话就是清空document的range
    sel.addRange(storeSel)
    document.execCommand('insertImage', false, address)
  }
}

function onShowconfirm(){
  $('#confirmBlock').modal("show")
}

function dragOver(evt) {
  evt.stopPropagation()
  evt.preventDefault()
  evt.originalEvent.dataTransfer.dropEffect = 'copy'
}

function fileSelect(evt) {

  evt.stopPropagation()
  evt.preventDefault()

  var file = evt.originalEvent.dataTransfer.files[0]

  if (!file.type.match('image.*')) {
    toastr.error('请上传图片')
    return false
  }

  var img = '<img class="preview" src="img/avatar.png" />'
  $('.textedit3').empty().append(img)

}

function scanforactive(){

  var divarray = $(window.getSelection().anchorNode).parentsUntil($('#text-to-do'))

  if(divarray.length == 0){
    $('#fontSize').html('12')
    $('#fontFamily').html('系统默认字体')
    clearactive()
  }else if(divarray.length == 1 && divarray[0] == 'div'){
    //  换行的时候会自动包div
    $('#fontSize').html('12')
    $('#fontFamily').html('系统默认字体')
    clearactive()
  }else(Traversing(divarray))

}

function Traversing(array){
  clearactive()
  array.each(function(){
    var actionName = this.nodeName
    var fontsize = this.size
    var fontfamily = this.face
    switch(actionName){
      case 'B':
        $('[data-name=text-bold]').addClass('active')
        break
      case 'I':
        $('[data-name=text-italic]').addClass('active')
        break
      case 'STRIKE':
        $('[data-name=text-strikeThrough]').addClass('active')
        break
      case 'U':
        $('[data-name=text-underline]').addClass('active')
        break
      case 'FONT':
        $('#fontSize').html(fontsizeTrans(fontsize))
        // 这步是避免两个font便签时里面的fontfamily被外面的fontfamily的''所代替
        if($('#fontFamily').html() !== '系统默认字体'){
          return
        }else{
          $('#fontFamily').html(fontfamilyTrans(fontfamily))
        }
        break
    }
  })
}

function clearactive(){
  $('[data-name=text-bold],[data-name=text-italic],[data-name=text-strikeThrough],[data-name=text-underline]').removeClass('active')
  $('#fontFamily').html('系统默认字体')
}

function fontfamilyTrans(res){
  if (res.length == 0){
    return '系统默认字体'
  }else{
    return res
  }
}


