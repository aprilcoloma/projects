var inputText = document.getElementById('search-input'),
    form     =  document.getElementById('search-form'),
    list     = document.getElementsByTagName('ul')[0],
    currentSearch = '',
    searchableTerm = '';


form.addEventListener('submit', function(e){
    currentSearch = inputText.value;
    e.preventDefault();

    for (var y = 0; y < list.children.length; y++){
        list.children[y].className = '';
    }
    compareWords();

});

var expandWord = function(){

};

var getDataItems = function(){
    for (var item = 0; item < data.length; item++) {
        var listItem = document.createElement('li'),

            wordWrapper = document.createElement('a'),
            typeWrapper = document.createElement('span'),
            meaningWrapper = document.createElement('span'),

            type = data[item].type,
            meaning = data[item].meaning;

        searchableTerm = data[item].word;
        wordWrapper.setAttribute('href','#');
        wordWrapper.innerHTML = searchableTerm;
        wordWrapper.classList.add('word', 'item');

        typeWrapper.innerHTML = data[item].type;
        typeWrapper.classList.add('type', 'item');

        meaningWrapper.innerHTML = data[item].meaning;
        meaningWrapper.classList.add('meaning', 'item');

        listItem.appendChild(wordWrapper);
        listItem.insertBefore(typeWrapper, wordWrapper.nextSibling)
        listItem.insertBefore(meaningWrapper, typeWrapper.nextSibling)
        list.appendChild(listItem);

    }
};

getDataItems();

var LI = document.getElementsByTagName('li');

for ( var a = 0; a < LI.length; a++ ) {
    var word = LI[a].getElementsByClassName('word')[0];

    word.addEventListener('click', function(){
        for ( var b = 0; b < LI.length; b++){
            alert(this.parentNode);
        }
    });
}

function compareWords(){

    var LI  = document.getElementsByTagName('li'),
        wordtoMatch = '',
        j = 0;

    for (j = 0; j < LI.length; j++){
        wordtoMatch = LI[j].getElementsByClassName('word')[0];

        wordtoMatch.addEventListener('click', function(){
            alert('hello');
        });



    }
}


