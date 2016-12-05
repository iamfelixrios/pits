function pitsQuery(vm,dis,cat,key){
    var layer = {}, iniTime = new Date();

    layer.query      = { district: dis, category: cat, keyword: !isEmpty(key)? key.split(' ') : [] };
    layer.didyoumean = [];
    layer.ids        = idsQuery(vm,layer.query.district,layer.query.category,layer.query.keyword, layer.didyoumean);
    layer.markers    = idToMarker(vm,layer.ids);
    layer.list       = idToList(vm,layer.ids);
    layer.ms         = new Date() - iniTime; 

    return layer;
}

function idsQuery(vm,a,b,k,didyoumean){
    if(a.length!==0 && b.length!==0){
        return k.length===0 ? _.intersection(unionSet(vm.setA,a),unionSet(vm.setB,b)) : _.intersection(_.intersection(unionSet(vm.setA,a),unionSet(vm.setB,b)),andWordAlias(vm,k,didyoumean));   
    }
    else if(a.length!==0 && b.length===0){
        return k.length===0 ? unionSet(vm.setA,a) : _.intersection(unionSet(vm.setA,a), andWordAlias(vm,k,didyoumean));          
    }   
    else if(a.length===0 && b.length!==0){
        return k.length===0 ? unionSet(vm.setB,b) : _.intersection(unionSet(vm.setB,b), andWordAlias(vm,k,didyoumean));          
    }
    else if( k.length!==0 ){
        return andWordAlias(vm,k,didyoumean);
    }  else return [];       
}

function unionSet(set,s){
    var _us = [];
    for (i = 0; i < s.length; i++) _us = _.union(_us,set[s[i]]);
    return _us;
}

function andWordAlias(vm,k,didyoumean){
    for (var i = 0; i < k.length; i++){
        sk = sanitize(k[i]);            
        if(vm.words[sk] === undefined && vm.alias[sk] !== undefined){
             k[i] = vm.alias[sk];
             didyoumean.push(k[i]);
        }
    }
    return andWord(vm,k);
}

function andWord(vm,k){
    var sk, _ak = [];
    for (var i = 0; i < k.length; i++){
        sk = sanitize(k[i]);
        _ak.length===0? _ak = vm.words[sk] : _ak = _.intersection(_ak,vm.words[sk]);
    }        
    return _ak;
}

function sanitize(word){
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüû";
    var to   = "aaaaaeeeeeiiiiooooouuuu";    

    word = word.toLowerCase();   

    for (var i=0, l=from.length ; i<l ; i++) {
        str = word.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    return word;
}

function idToMarker(vm,pids){
    var layer = [], activeMarker, j;
    var ids = (pids || []);
    for (var i = 0; i < ids.length; i++) {
        j = ids[i];
        activeMarker = createMarker(vm,vm.pits[j].lat,vm.pits[j].lng,vm.pits[j].tit,vm.pits[j].abs,vm.pits[j].img,vm.pits[j].icon,vm.pits[j].dis,vm.pits[j].adr, vm.pits[j].id);        
        layer.push(activeMarker);        
    } 
        
    return layer;
}

function idToList(vm,pids){
    var list = [];
    var ids = (pids || []);    
    for (var i = 0; i < ids.length; i++){
        list.push({ tit: vm.pits[ids[i]].tit, abs: vm.pits[ids[i]].abs, img: vm.pits[ids[i]].img, cat: vm.setBNames[vm.pits[ids[i]].icon], adr: vm.pits[ids[i]].adr , dis: vm.pits[ids[i]].dis, icon: 'img/' + vm.icons[vm.pits[ids[i]].icon] } );
    }  
    return list;    
}
function isEmpty(str) {
    return (!str || 0 === str.length);
}