var doc       = document,
    inputText = doc.getElementById('search-input'),
    form     =  doc.getElementById('search-form'),
    list     =  doc.getElementsByTagName('ul')[0],
    currentSearch = '',
    searchableTerm = '',
    errorMessage = doc.getElementsByClassName('message')[0];

// display the glossary
var getDataItems = function(){
    for (var item = 0; item < data.length; item++) {
        var listItem = doc.createElement('li'),

            wordWrapper = doc.createElement('a'),
            typeWrapper = doc.createElement('span'),
            meaningWrapper = doc.createElement('span'),

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

// get the input value; compare it against the words from the words list
form.addEventListener('submit', function(e){
    currentSearch = inputText.value;
    e.preventDefault();

    for (var y = 0; y < list.children.length; y++){
        list.children[y].className = '';
    }

    filterWords();
});


// activate the list item that contains the correct match; disable its siblings
var filterWords  = function(){
    var itemLI = doc.getElementsByTagName('li');

    for ( var a = 0; a < itemLI.length; a++){
        var word = itemLI[a],
            wordtoMatch = word.getElementsByClassName('word')[0];

        // if the user entered a keyword  and submitted the form
        if ( inputText.value !== '' ) {
           if ( currentSearch === wordtoMatch.innerHTML ){
                word.classList.add('active', 'expanded');
                errorMessage.classList.remove('active');
                removeSiblings();
           }

            if ( currentSearch !== wordtoMatch.innerHTML ){
                errorMessage.classList.add('active');
                word.classList.add('hidden');
            }
        }

        // if the user submitted the form without  entering any word, hide the error message
        if ( inputText.value === '' ){
             errorMessage.classList.remove('active');
        }


       // view the type and the definition of the selected word
        word.addEventListener('click',function(e){
            this.classList.add('active', 'expanded');
            e.preventDefault()
            removeSiblings();
        });

        var removeSiblings = function(){
            for ( var b = 0; b < itemLI.length; b++){
                if ( !itemLI[b].classList.contains('active', 'expanded')){
                    itemLI[b].classList.add('hidden');
                }
            }
        };

    }

};

getDataItems();
filterWords();




