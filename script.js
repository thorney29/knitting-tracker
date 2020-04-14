const app = new Vue({
  el:'#app',
  data: {
    castOns:[],
    newCastOn:null,
    rows:[],
    newRow:null,
    stitches:[],
    newStitch:null,
    stitchesStitched:[],
    newStitchesStitched:null,
    mainColor: '',
    newColor: '',
    altColor: '',
    newAltColor: '',
    count: null,
    altColorStitches: [],
    altColorStitch: '',
    newAltColorStitch:''
  },
  mounted() {
    if(localStorage.getItem("rows")) {
      try {
        this.rows = JSON.parse(localStorage.getItem("rows"));
      } catch(e) {
        localStorage.removeItem("rows");
      }
    }

    if(localStorage.getItem("stitches")) {
      try {
        this.stitches = JSON.parse(localStorage.getItem("stitches"));
      } catch(e) {
        localStorage.removeItem("stitches");
      }
    }
    if(localStorage.getItem("stitchesStitched")) {
      try {
        this.stitchesStitched = JSON.parse(localStorage.getItem("stitchesStitched"));
      } catch(e) {
        localStorage.removeItem("stitchesStitched");
      }
    }
   if(localStorage.getItem("castOns")) {
      try {
        this.castOns = JSON.parse(localStorage.getItem("castOns"));
      } catch(e) {
        localStorage.removeItem("castOns");
      }
    }
    if(localStorage.getItem("mainColor")) {
      try {
        this.mainColor = JSON.parse(localStorage.getItem("mainColor"));
      } catch(e) {
        localStorage.removeItem("mainColor");
      }
    }
    if(localStorage.getItem("altColor")) {
      try {
        this.altColor = JSON.parse(localStorage.getItem("altColor"));
      } catch(e) {
        localStorage.removeItem("altColor");
      }
    }
    if(localStorage.getItem("altColorStitches")) {
      try {
        this.altColorStitches = JSON.parse(localStorage.getItem("altColorStitches"));
      } catch(e) {
        localStorage.removeItem("altColorStitches");
      }
    }
  },
  methods: {  
    addMainColor() {
      // ensure they actually typed something
      if(!this.newColor) return;
      this.mainColor = this.newColor;
      this.addColor(this.mainColor);
      this.saveMainColor();
    },
    addAltColor() {
      // ensure they actually typed something
      if(!this.newAltColor) return;
      this.altColor = this.newAltColor;
      this.addAltColorToGrid(this.altColor);
      this.saveAltColor();
    },

    addColor(mainColor) {
      console.log(mainColor);
      // let mainColor = document.querySelector('.mainColor').textContent;
      let boxes = document.querySelectorAll('.grid');
      for (var i = 0; i < boxes.length; ++i) {
         boxes[i].style.background = mainColor;
      }
      let lastContainer = document.getElementById("container-wrapper");
      localStorage.setItem('lastContainer', JSON.stringify(lastContainer.innerHTML));
    },
    addAltColorStitch(altColor) {
      // ensure they actually typed something
      if(!this.newAltColorStitch) return;
      this.altColorStitchArray = this.newAltColorStitch.split(',');
      this.altColorStitches.push(this.altColorStitchArray); 
      this.newAltColorStitch = '';     
      this.saveAltColorStitches();
    },
    addCastOn(e) {
      // ensure they actually typed something
      if(!this.newCastOn) return;
      this.castOns.push(this.newCastOn);
      this.addNewCastOn(this.newCastOn);
      this.newCastOn = '';
      this.saveCastOns();
    },
    addRow(e) {
      // ensure they actually typed something
      if(!this.newRow) return;
      this.rows.push(this.newRow);
      this.newRow = '';
      this.saveRows();
    },
    addStitch(n) {
      // ensure they actually typed something
      if(!this.newStitch) return;
      this.count = count++;
      // console.log(`this is the ${n} value`);
      this.stitches.push(this.newStitch);
      this.stitchIndex = this.stitches.indexOf(this.newStitch);
      // console.log(`this is the stitch Index ${this.stitchIndex} value`);
      this.addNewKnitRow(this.newStitch,this.stitchIndex,this.count,this.stitches);
      this.addColor(this.mainColor);
      this.newStitch = '';
      this.saveStitches();
    },
    addStitchesStitched(e) {
      // ensure they actually typed something
      if(!this.newStitchesStitched) return;
      this.stitchesStitched.push(this.newStitchesStitched);
      this.newStitchesStitched = '';
      this.saveStitchesStitched();
    },
    addAltColorToGrid() {
      // this.altColor = JSON.stringify(this.altColor);
      // this.altColorStitches
     this.altColorStitches = JSON.parse(localStorage.getItem("altColorStitches"));
      // this.addToGrid = JSON.stringify(this.altColorStitchesaltColorStitches);
      this.addAltColortoGridRows(this.altColorStitches,this.altColor);
    },
    removeMainColor(x) {
      this.mainColor = '';
      this.removeColor();
      this.saveMainColor();
    },
    removeAltColor(x) {
      this.altColor = '';
      // this.removeColor();
      this.saveAltColor();
    },
    removeColor() {
      // let mainColor = document.querySelector('.mainColor').textContent;
      let boxes = document.querySelectorAll('.grid');
      for (var i = 0; i < boxes.length; ++i) {
         boxes[i].style.background = null;
      }
      let lastContainer = document.getElementById("container-wrapper");
      localStorage.setItem('lastContainer', JSON.stringify(lastContainer.innerHTML));
    },
    deleteCastOn(x,e) {
      this.castOns.splice(x,1);
      this.saveCastOns();
      this.removeCastOn();
    },
    removeRow(x) {
      this.rows.splice(x,1);
      this.saveRows();
    },
    removeStitch(x) {
      let removeThisStitch = this.stitches[x];
      this.removeKnitRow(x);
      this.stitches.splice(x,1);
      this.saveStitches();
    },
    removeStitchesStitched(x) {
      this.stitchesStitched.splice(x,1);
      this.saveStitchesStitched();
    },
     removeAltColorStitches(x) {
      this.altColorStitches.splice(x,1);
      this.saveAltColorStitches();
    },
    saveMainColor() {
      let parsed = JSON.stringify(this.mainColor);
      localStorage.setItem('mainColor', parsed);
    },
    saveAltColor() {
      let parsed = JSON.stringify(this.altColor);
      localStorage.setItem('altColor', parsed);
    },
    saveAltColorStitches(){
      let parsed = JSON.stringify(this.altColorStitches);
      localStorage.setItem('altColorStitches', parsed);
    },
    saveCastOns() {
      let parsed = JSON.stringify(this.castOns);
      localStorage.setItem('castOns', parsed);
    },
    saveRows() {
      let parsed = JSON.stringify(this.rows);
      localStorage.setItem('rows', parsed);
    },
    saveStitches() {
      let parsed = JSON.stringify(this.stitches);
      localStorage.setItem('stitches', parsed);
    },
    saveStitchesStitched() {
      let parsed = JSON.stringify(this.stitchesStitched);
      localStorage.setItem('stitchesStitched', parsed);
    },
    updateStitchesStitched(x) {
      let item = this.stitchesStitched[0];
      console.log(item);
      // let items = stitchesStitched;
      // let foundIndex = items.findIndex(x => x.id == item.id);
      // items[foundIndex] = item;
      // this.saveStitchesStitched();
    },
    addNewCastOn (newCastOn) {
      let count = 0;
      /* Adds Element AFTER NeighborElement */
      // Element.prototype.appendAfter = function (element) {
      //     element.parentNode.insertBefore(this, element.nextSibling);
      // }, false;
      let lastContainer = document.getElementById("container-wrapper");
      // let container = document.querySelector('.container');
      let castOnContainer = document.createElement('div');
      castOnContainer.classList.add('castOnContainer');
      // newContainer.appendAfter(lastContainer);
      lastContainer.appendChild(castOnContainer);

      castOnContainer.setAttribute('style', `grid-template-columns: repeat(${newCastOn},1fr);`);
      castOnContainer.innerHTML = '';
      for (let i = 1; i <= newCastOn; i++) {
        castOnContainer.innerHTML += `<div id="grid-${count}${i}" class="grid" style="border:1px solid #ccc;"><img src="./icons/infinity-solid.svg" alt=""></div>`; 
      }
      // localStorage.setItem('containerWrapper', lastContainer.innerHTML);
      localStorage.setItem('lastContainer', JSON.stringify(lastContainer.innerHTML));
    },
    removeCastOn(){
      document.querySelectorAll('.castOnContainer').forEach(e => e.remove());
      localStorage.removeItem('castOnContainer', '');
    },

    addNewKnitRow (newStitch,stitchIndex,count,stitches) {
      document.getElementById("count").innerHTML = count;
      const lastContainer = document.getElementById("container-wrapper");
      const castOnContainer = document.querySelector('.castOnContainer');
      
      /* Adds Element AFTER NeighborElement */
      Element.prototype.appendAfter = function (element) {
          element.parentNode.insertBefore(this, element.nextSibling);
      }, false;

        let stitchContainer = document.createElement('div');
        stitchContainer.classList.add('stitchContainer');
        lastContainer.appendChild(stitchContainer);
       
        stitchContainer.setAttribute('style', `grid-template-columns: repeat(${newStitch},1fr);`)
        // to double match the corresponding stitch
        stitchContainer.dataset.stitch = `${newStitch}`;
        //
        console.log(`length of stitches ${stitches}`); 

        // deine the letter to find the index of the alphabet using the alphabet array 
        let alpha = '';
        //
        for(let a = 0; a < stitches.length; a++) {
         
         console.log(`this is a ${a}`);//2

          // stitchContainer.id = `row-${stitches[i]}`;
          stitchContainer.id = `row-${a}`;
          alpha = alphabet[a];
        }
        for (let i = 1; i <= newStitch; i++) {
            stitchContainer.innerHTML += `<div id="grid${alpha}${stitchIndex}${i}"  class="grid grid--${count}${alpha}${i}" onkeydown="keyCode(event,id);"><input style="background: ${mainColor};" type="text" /></div>`; 
          }      
          localStorage.setItem('lastContainer', JSON.stringify(lastContainer.innerHTML));
          localStorage.setItem('count', JSON.stringify(count));
        // }
    },

    removeKnitRow(x){
      // say that the number removed is 5 
      // that means 6 goes to 5 and 7 goes to 6 etc

      console.log(`number to remove ${x}`);//2
      document.querySelectorAll(`#row-${x}`).forEach(e => e.remove());// remove row 2

      var rows = document.querySelectorAll('[id^="row-"]'); // get remaining rows
      let rowNumbers = Array.prototype.slice.call(rows, 0)
      .filter(function (el) {
        return el.id;
      });
      console.log(rowNumbers);
        let newX = 0;
        // get the number in the row id and decrease by 1
        var e = document.querySelectorAll(`[id^="row-"]`).forEach(e => {
            let s = e.id;
            console.log(`this is the id of the row ${s}`);
            let num = s.substring(s.length, 4, s.indexOf('-'));
            console.log(`this is the id number of the row above ${num}`);
            console.log(`if ${num}> ${x}`);
            if(num > x) {
              newX = num - 1;
              console.log(`this is the new number to go into the row ${newX}`);
              e.id = `row-${newX}`;
            }
           console.log(`this is the same id`);

          });
     
      // document.querySelectorAll('.stitchContainer').forEach(e => e.remove());
      let lastContainer = document.getElementById("container-wrapper");
      localStorage.setItem('lastContainer', JSON.stringify(lastContainer.innerHTML));
      let updatedCount = Number(document.getElementById("count").innerHTML);
      count = updatedCount - 1;
      if(count < 0) {
        return count = 0;
      }
      localStorage.setItem('count', JSON.stringify(count));
      document.getElementById("count").innerHTML = count;
      localStorage.setItem('lastContainer', JSON.stringify(lastContainer.innerHTML));
    },
    addAltColortoGridRows(altColorStitches,altColor) {
      // basically i need to get the row number that corresponds to the array index so i can use that row id to select the correct 
      // grid to change the background color
      let row = '';
      let childNum = '';
      let background = altColor;
      if(altColorStitches.length == undefined){
        console.log(altColorStitches.length);
        return
      };
      for(let j = 0; j < altColorStitches.length;j++){
        for(let k = 0; k < altColorStitches[j].length; k++) {
                childNum = altColorStitches[j][k];
                childNum = Number(childNum);
                // console.log(typeof background);
                let row = document.querySelector(`#row-${j} .grid:nth-child(${childNum})`)
                row.style.background = `${background}`;
                // rowbox.setAttribute(`"style", "background-color: background;"`); 
                console.log(background);
               
        }
      }
      let lastContainer = document.getElementById('container-wrapper');
      localStorage.setItem('lastContainer', JSON.stringify(lastContainer.innerHTML));
      localStorage.setItem('count', JSON.stringify(count));
    }
  }
})