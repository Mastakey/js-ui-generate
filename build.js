var newComponent = function(id, className, tag){
    var myjson = toJson(tag, id, className, '', false, '', '');
    return myjson;
}

var drawComponents = function(components){
    var select = document.getElementById('components');
    for (var i=0; i<components.length; i++){
        var option = document.createElement('option');
        option.value = components[i]['id'];
        option.text = components[i]['id'];
        select.appendChild(option);
    }
}

var drawComponent = function(componentjson){
    var jsonstr = JSON.stringify(componentjson, null, 4);
    document.getElementById('json').innerHTML = jsonstr;
    console.log(componentjson);
    var obj = toJSObj(componentjson);
    console.log(obj);
    removeChildren(document.getElementById('source'));
    document.getElementById('source').appendChild(document.createTextNode(obj.parentElement.innerHTML));
    removeChildren(document.getElementById('preview'));
    document.getElementById('preview').appendChild(obj);
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
    var children = json['children'];
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
    if ('children' in json){
        for (var i=0; i<children.length; i++){
            obj.appendChild(toJSObj(children[i]));
        }
    }
    wrapper.appendChild(obj);
    if ('label' in json){
        return wrapper;
    }
    return obj;
}

var removeChildren = function(obj){
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
}

//Helper functions
var addChildren = function(array, obj){
    var children = array;
    children.push(obj);
    return children;
}

/*
var children = componentjson['children'];
children.push(objjson);
componentjson['children'] = children;
*/