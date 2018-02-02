var readInput = function(){
    //type
    //id
    //class
    var type = document.getElementById('type');
    type = type.options[type.selectedIndex].value;
    console.log(type);
    var id = document.getElementById('id').value;
    var text = document.getElementById('text').value;
    var className = document.getElementById('class').value;
    var hasLabel = document.getElementById('label').checked;
    var labelName = document.getElementById('label_name').value;
    var labelClassName = document.getElementById('label_class').value;
    json = toJson(type, id, className, text, hasLabel, labelName, labelClassName);
    //jsObj = toJSObj(type, id, className, hasLabel);
    console.log(json);
    return json;
}

var toJson = function(type, id, className, text, hasLabel, labelName, labelClassName){
    var objectDict = {
        'id': id,
        'type': type,
        'class': className,
        'text': text
    };
    if (hasLabel){
        var labelDict = {
            'id': 'label_'+id,
            'class': labelClassName,
            'text': labelName
        };
        objectDict['label'] = labelDict;
    }
    return objectDict;
}

var toJSObj = function(json){
    var type = json['type'];
    var id = json['id'];
    var text = json['text'];
    var className = json['class'];
    var wrapper = document.createElement('div');
    var obj = document.createElement(type);
    obj.setAttribute('id', id);
    obj.setAttribute('class', className);
    if (text != ''){
        obj.appendChild(document.createTextNode(text));
    }
    if ('label' in json){
        var labelObj = document.createElement('label');
        var labelId = json['label']['id'];
        var labelName = json['label']['text'];
        var labelClassName = json['label']['class'];
        labelObj.setAttribute('id', labelId);
        labelObj.setAttribute('for', id);
        labelObj.setAttribute('class', labelClassName);
        labelObj.appendChild(document.createTextNode(labelName))
        wrapper.appendChild(labelObj);
    }
    wrapper.appendChild(obj);
    return wrapper;
}

var jsToHTML = function(jsObj){
    return jsObj.innerHTML;
}

var addCss = function(cssStr){
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = cssStr;
    document.body.appendChild(css);
}