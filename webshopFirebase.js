window.addEventListener('load', function() {
    
    // hämtar alla element
    
    // inputs
    let item = document.getElementById('item');
    let price = document.getElementById('price');
    let showLast = document.getElementById('showLast');
    let showFirst = document.getElementById('showFirst');
    
    // buttons
    let add = document.getElementById('add');
    let sortByName = document.getElementById('sortByName');
    let sortByPrice = document.getElementById('sortByPrice');
    let showFirstNumberChosen = document.getElementById('showFirstNumberChosen');
    
    //  lists of items
    let itemList = document.getElementById('itemList');
    
    
    // show list of items in webpage
    firebase.database().ref('items/')
    .on('value', function(snapshot) {
            snapshot.forEach(child => {
                    let object = child.val();
/*console.log(object); 
console.log(object.itemName); 
console.log(object.itemPrice);    */        
                
                    
                    let li = document.createElement('li');
                    li.innerHTML = object.itemName + object.itemPrice;
                    itemList.appendChild(li);
                    
                
            }) // end of forEach loop
             
        
    }) // end of snapshot
    
    // create an item when clicking on add 
    add.addEventListener('click', function() {
        
            itemList.innerHTML ="";
            
            firebase.database().ref('items/')
            .push({
                itemName: item.value,
                itemPrice: Number(price.value)                
            }) // end of push
            
            item.value = "";
            price.value = "";
        
    }); // end of add button
    
    
    // sort items by name
    sortByName.addEventListener('click', function() {
        
            itemList.innerHTML = "";
            
            firebase.database().ref('items/').orderByChild('itemName')
            .once('value', function(snapshot) {
                         
                    snapshot.forEach(child => {
                            
                        let object = child.val();
                        
                        let li = document.createElement('li');
                        li.innerHTML = "Item: " + object.itemName + "   Price: " + object.itemPrice + "$";
                        itemList.appendChild(li);                      
                    }) // end of for Each loop
                
            })  // end of snapshot
    });  // end of sort by name
            
     // sort by price 
    sortByPrice.addEventListener('click', function() {
        
            itemList.innerHTML = "";
            
            firebase.database().ref('items/').orderByChild('itemPrice')
            .once('value', function(snapshot) {
                         
                    snapshot.forEach(child => {
                            
                        let object = child.val();
                        
                        let li = document.createElement('li');
                        li.innerHTML = object.itemName + object.itemPrice;
                        itemList.appendChild(li);                      
                    }) // end of for Each loop
                
            })  // end of snapshot        
        
    }); // end of sort by price
    
    
    // show first items
    showFirstNumberChosen.addEventListener('click', function(){
                
                itemList.innerHTML = "";
                let howManyToShowFirst = showFirst.value;
                Number(howManyToShowFirst);
                firebase.database().ref('items/').orderByChild('itemName').limitToFirst(Number(howManyToShowFirst))
                .on('value', function(snapshot) {
                        
                        snapshot.forEach(child => {
                            
                            let object = child.val();
                        
                            let li = document.createElement('li');
                            li.innerHTML = object.itemName + object.itemPrice;
                            itemList.appendChild(li);                            
                        })  // end of for each loop
                            showFirst.innerHTML = "";
                        
                    });  // end of snapshot 

        
    });  // end of show first
    
  }); // end of windows load