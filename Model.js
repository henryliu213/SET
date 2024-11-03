export class Model extends EventTarget{
    cards;
    used;
    count;
    clicked;
    threeopened;
    extra = 0;
    time = 0;
    intvid = 0;
    
    constructor(){
        super();
        //this.used = new Array(81).fill(0);
        this.count = 0;
        this.cards = new Array(81);
        let colors = ['g', 'b', 'p'];
        let nums = [1,2,3];
        let pats = ['s','f','o'];
        let shapes = ['d','s','c'];
        this.clicked = [];
        let a =0;
        for (let i in nums){
            for (let j  in colors){
                for (let k in pats){
                    for (let l in shapes){
                        this.cards[a] = new Card(nums[i],colors[j],pats[k],shapes[l]);
                        a++;
                    }
                }
            }
        }
        this.startgame(this.clicked);
        let p = document.getElementsByClassName('counter');
        p[1].innerHTML = "Cards remaining in deck: " + (81 - this.count);
        
    }
    
    startgame = function(clicked ){
        if (this.intvid == 0){
            this.intvid = setInterval(()=>{
                document.getElementsByClassName('counter')[0].innerHTML = 'Time: ' + (++this.time);
            }, 1000);
        }
        this.threeopened = false;
        this.cards = this.cards.sort((a,b)=>
            0.5 - Math.random()
        );
        
        let boxes = document.getElementsByClassName('box');
        for (let i = 0; i <boxes.length;i++){
            let cur = boxes[i];
            let cardy = this.cards[i];
            cur.append(this.createimg(cardy, clicked));
            this.count++;
        }

        let buty = document.getElementsByClassName('new');
        buty[0].onclick = ()=>{
            this.time = 0;
            document.getElementsByClassName('counter')[0].innerHTML = 'Time: ' + (this.time);
            let msgy = document.getElementsByClassName('msg')[0];
            msgy.innerHTML = 'Click a box, press qwer, asdf, zxcv';
            this.count = 0;
            this.threeopened = false;
            this.extra = 0;
            this.clicked = [];
            this.cards = this.cards.sort((a,b)=>
                0.5 - Math.random()
            );
            
            let list = document.getElementsByClassName('box');
            let leny = list.length;
            while (leny >12){
                let rows = document.getElementsByClassName('row');
                for (let row of rows){
                    row.lastElementChild.remove();
                }
                leny = document.getElementsByClassName('box').length;
            }
            for (let box of list){
                box.innerHTML = '';
            }
            
           

            this.startgame(this.clicked);
        }

        let but = document.getElementsByClassName('open');
        but = but[0];
        but.onclick = () =>{
            if (this.bigcomp()){
                let b = document.getElementsByClassName('msg');
                b[0].innerHTML = 'THERE IS A SET';
                let buty = document.getElementsByClassName('new')[0];  
                // alert("There is a set, game is resetting."); // COMMENT OUT These if we want to not force reset;
                // buty.click(); // THiS TOO
                return
            }
            let arr = document.getElementsByClassName('row');
            this.threeopened = true;
            this.extra +=1;
            let i = 0;
            for(let a of arr){
                let newbox = document.createElement('td');
                newbox.className = 'box';
                if (3*(this.extra -1) + i == 0){
                    newbox.id ='t';
                }
                if (3*(this.extra -1)+ i == 1){
                    newbox.id ='g';
                }
                if (3*(this.extra -1)+i ==2){
                    newbox.id = 'b';
                }   
                if (3*(this.extra -1)+i ==3){
                    newbox.id = 'y';
                }  
                if (3*(this.extra -1)+i ==4){
                    newbox.id = 'h';
                }  
                if (3*(this.extra -1)+i ==5){
                    newbox.id = 'n';
                }  

                i++;
                newbox.append(this.createimg(this.cards[this.count], clicked));
                this.count++;

                a.append(newbox);
            }
            let p = document.getElementsByClassName('counter');
            p[1].innerHTML = "Cards remaining in deck: " + (81 - this.count);

            
        };

        this.time = 0;
    };


    comparey = function(){
        
        let a = this.clicked[0].alt;
        let b = this.clicked[1].alt;
        let c = this.clicked[2].alt;
        for (let i in a){
            if (a[i] == b[i]){
                if (c[i] != a[i]){
                    return false;
                }
            }
            else{
                if (c[i] == a[i] || c[i] == b[i]){
                    return false;
                }
            }
        }
        return true;
    };

    createimg = function(cardy, clicked){
        let img = document.createElement('img');
        img.alt = cardy.name;
        img.src = cardy.img;
        img.style.width = '125px';
        img.style.height = 'auto';
        img.style.border = 'solid';
        img.style.borderColor = 'transparent';
        img.style.borderWidth = '4px';
        img.onclick = () =>{
            if (clicked.indexOf(img) == -1 ){
                clicked.push(img);
                img.style.border = 'solid';
                img.style.borderColor = "#feb900";
                img.style.borderWidth = '4px';
                if (clicked.length == 3){
                    //THis is the third 
                    let b = document.getElementsByClassName('msg');
                    if(this.comparey()){
                        b[0].innerHTML = '';
                        let rows = document.getElementsByClassName('row');
                        for (let imy in clicked){
                            let parent = clicked[imy].parentElement;//this is box 
                            if (this.count < 81 && this.extra <=0){  //shoudl always just = 0
                                parent.innerHTML = '';
                                parent.append(this.createimg(this.cards[this.count], clicked));
                                this.count++;
                            }
                            else if(this.count< 81 && this.extra>0){
                                rows[imy].lastElementChild.append('hi');
                                let targ = rows[imy].lastElementChild.firstElementChild; // this is img
                                parent.innerHTML = '';
                                parent.append(targ);
                            
                            }
                            else if (this.count >= 81){
                                parent.innerHTML = '';
                            }   
                        }
                        if (this.extra > 0){
                            for (let row of rows){
                                row.lastElementChild.remove();
                            }
                            this.extra--;
                        }
                        
                        
                    }else{
                        b[0].innerHTML = 'Not a set! \u2639'

                    }
                    let a = clicked.pop();
                    a.style.borderColor = 'transparent';
                    a = clicked.pop();
                    a.style.borderColor = 'transparent';
                    a = clicked.pop();
                    a.style.borderColor = 'transparent';

                    
                    if (this.count >= 81){
                        if (!this.bigcomp()){
                            clearInterval(this.intvid);
                            this.intvid = 0;
                            b[0].innerHTML = 'YOU WIN!!';
                            //let tab = document.getElementsByClassName('bigtable');
                        }
                        
                    }
                    let p = document.getElementsByClassName('counter');
                    p[1].innerHTML = "Cards remaining in deck: " + (81 - this.count);
                }
            }
            else{
                //clicked.remove(img);
                img.style.borderColor = 'transparent';
                let index = clicked.indexOf(img);
                if (index > -1) {
                    clicked.splice(index, 1);
                }
            }

            
        };
            
        return img;
    }
    
   
    bigcomp = function(){
        let ay = document.getElementsByClassName('box');
        let foundset = false;
        for (let i = 0; i < ay.length; i++){
            for (let j = i+1; j<ay.length; j++){
                for (let k = j+1; k< ay.length; k++ ){
                        if(ay[i].firstElementChild == null || ay[j].firstElementChild == null || ay[k].firstElementChild == null){
                            continue;
                        }
                        let a = ay[i].firstElementChild.alt;
                        let b = ay[j].firstElementChild.alt;
                        let c = ay[k].firstElementChild.alt;
                        let temp = true;
                        for (let l = 0; l< a.length; l++){
                            if (a[l] == b[l]){
                                if (c[l] != a[l]){
                                    temp = false;
                                    break;
                                }
                            }
                            else{
                                if (c[l] == a[l] || c[l] == b[l]){
                                    temp = false;
                                    break;
                                }
                            }
                        }
                        foundset = foundset || temp;
                        
                }
                
            }
        }
        return foundset;
    }


}

class Card{
    num;
    color;
    pattern;
    shape;

    constructor(n,c,p,s){
        this.num = n;
        this.color = c;
        this.pattern = p;
        this.shape = s;
    }
    get img(){
        let s = './imgs/' + this.num + this.color + this.pattern + this.shape + '.png';
        return s;
    }
    get name(){
        return ''+ this.num + this.color + this.pattern + this.shape;
    }
}

let mod = new Model();
document.addEventListener("keydown",(e) => {
   
    if (e.key == '3'){
        document.getElementById('o3').click();
        return;
    }
    if (e.key == '4'){
        document.getElementById('4').click();
        return;
    }
    if( document.getElementById(e.key) != null) {
        let ele = document.getElementById(e.key).firstElementChild;
        if (ele != null){
            ele.click();
        }
    }
  });
