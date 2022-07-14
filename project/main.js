"use strict";
var sentDiag = (function () {
    var proposal = ["","","","",""];
    var can,
      elDragged,
      diag = {
        showing: false,
        fsize:0,
        marg:0.1,
        pad:0.01,
        base: 0.4,
        sent:0,
        dobj:0,
        adj:0,
        adv:0,
        crossLoc: 0.5,
        crossLocA: 0.3,
        crossLocB: 0.6,
      },
      sentence = "Diligent farmers .#$,?  delivered   fresh beets.",
      wordButtons,
      words;
      can = document.getElementById("myCanvas"),
  can.width = window.innerWidth / 2 - 10;
  can.height = window.innerHeight / 2;

       let ctx = can.getContext("2d");
   function drawMainSentence()  {
      let msg, w =can.width, h = can.height;

       if (diag.sent)  {
           msg = "You already have the main sentence structure";
           document.getElementById("errMess").innerText=msg;
       } else  {
           diag.sent = 1;
           msg = "";
           document.getElementById("errMess").innerText=msg;
          // draw horizontal line for sentence structure
            ctx.beginPath();
            ctx.moveTo(diag.marg * w, diag.base * h);
            ctx.lineTo((1 - diag.marg) * w, diag.base * h);
            ctx.stroke();

            // draw vertical line for sentence structure
            ctx.beginPath();
            ctx.moveTo(diag.crossLoc * w, (diag.base - diag.marg) * h);
            ctx.lineTo(diag.crossLoc * w, (diag.base + diag.marg) * h);
            ctx.stroke();
        }
          displayErrorMsg(msg);   

        // alert("drawMainSentence");
        }
   function drawDirectObjectLine()  {
    var msg, w = can.width, h = can.height;
   
    if (!diag.sent) {
      msg = "You need a sentence structure first.";
     document.getElementById("errMess").innerText=msg;
    }
    else {
      if (diag.dobj) {
      msg = "You already have a direct object line structure.";
       document.getElementById("errMess").innerText=msg;
  
       } else {

        (msg = ""),
        (diag.crossLoc = diag.crossLocA);
         redraw();
         console.log(redraw());
        diag.dobj = 1;
      ctx.beginPath();
      ctx.moveTo(diag.crossLocB * w, (diag.base - diag.marg) * h);
      ctx.lineTo(diag.crossLocB * w, diag.base * h);
      ctx.stroke();
       document.getElementById("errMess").innerText=msg;
    }
    
     //  alert("drawDirectObjectLine");
   }
   //let msg = "";
    //let w = can.width;
   // let h = can.height;
   // msg = "hello";
   // diag.crossLoc = diag.crossLocA;
   // redraw();

    //diag.dobj = 1;
    // draw horizontal line for sentence structure
   // ctx.beginPath();
    //ctx.moveTo(diag.crossLocB * w, diag.base + diag.marg);
    //ctx.lineTo(diag.crossLocA * w, diag.base + diag.marg);
    //ctx.stroke();
    
    //displayErrorMsg(msg);
    //console.log("Direct")
  
  }

    function drawAdjLine() {
        var msg, w = can.width, h = can.height;

        if (!diag.sent) {
          msg = "You need a sentence structure first.";
      
        } else {
          if (diag.adj) {
            msg = "You already have an adjective structure.";
            document.getElementById("errMess").innerText=msg;
          } else {
            diag.adj = 1;
            msg = "";
            document.getElementById("errMess").innerText=msg;
            ctx.save();
            ctx.translate((diag.marg + diag.pad) * w, diag.base * h);
            ctx.rotate(45 * Math.PI / 180);
            ctx.moveTo(0, 0);
            ctx.lineTo(1.5 * ctx.measureText(longestWord()).width, 0);
            ctx.stroke();
            ctx.restore();
          }
        }
      
            displayErrorMsg(msg);
            //alert("drawAdjLine");
    }
      
    function drawModLine () {  
      //let elm= document.elementFromPoint(146,80) ;
     let w = can.width;
     let  h = can.height;
     let msg =  document.getElementById("errMess");
      if (!diag.sent) {
        msg = "You need a sentence structure first.";
      
      } else if (diag.mod) {
        msg = "You need a modifier structure first.";

      } else {
        diag.mod = 1;
        msg = "";
   
        ctx.save();
        ctx.translate((diag.crossLocB + diag.pad) * w, diag.base * h);
        ctx.rotate((45 * Math.PI) / 180);
        ctx.moveTo(0, 0);
        ctx.lineTo(1.5 * ctx.measureText(longestWord()).width, 0);
        ctx.stroke();
        ctx.restore();
        displayErrorMsg("modifier line drawn");
        console.log(diag.mod==diag.adv);
      }
    }
 
    function drawMod (a) {
      var msg,
      w = can.width,
      h = can.height;
    if (!diag.sent) {
      msg = "You need a sentence structure first.";
      document.getElementById("errMess").innerText=msg;
    } else if (!diag.mod) {
      msg = "You need a modifier structure first.";
      document.getElementById("errMess").innerText=msg;
    } else {
      // sentence and modifier structures exist
      msg = "";
      document.getElementById("errMess").innerText=msg;
      if (proposal[3] !== "") {
        // replace current word
        proposal[3] = a;
        redraw();
      } else {
        // draw new word
        proposal[3] = a;
        ctx.save();
        ctx.translate((diag.crossLocB + 2 * diag.pad) * w, diag.base * h);
        ctx.rotate((45 * Math.PI) / 180);
        ctx.moveTo(0, 0);
        ctx.fillText(a, diag.fsize, 0);
        ctx.restore();
      }
    }
      }

    function drawSubject(s) {
            var msg, w = can.width, h = can.height;
          
            if (!diag.sent) {
              msg = "You need a sentence structure first.";
              document.getElementById("errMess").innerText=msg;
            } else {
              msg = "";
              document.getElementById("errMess").innerText=msg;
              if (proposal[1] !== "") { // replace current word
                proposal[1] = s;
                redraw();
          
              } else {
                proposal[1] = s;
                ctx.fillText(s, (diag.marg + diag.pad) * w, (diag.base - diag.pad) * h);
              }
            }
          
            displayErrorMsg(msg);

        //alert("drawSubject");
    }
    
    function drawPredicate(p) {
      var msg,
      w = can.width,
      h = can.height;
    if (!diag.sent) {
      msg = "You need a sentence structure first.";
      document.getElementById("errMess").innerText=msg;
    } else {
      msg = "";
      document.getElementById("errMess").innerText=msg;
      if (proposal[2] !== "") {
        // replace current word
        proposal[2] = p;
        redraw();
      } else {
        proposal[2] = p;
        ctx.fillText(
          p,
          (diag.crossLoc + 2 * diag.pad) * w,
          (diag.base - diag.pad) * h
        );
      }
    }
    displayErrorMsg(msg);
  
    }
    
    function drawAdj(a) {
        var msg, w = can.width, h = can.height;

        if (!diag.sent) {
          msg = "You need a sentence structure first.";
          document.getElementById("errMess").innerText=msg;
        } else if (!diag.adj) {
          msg = "You need an adjective structure first.";
          document.getElementById("errMess").innerText=msg;
        } else { // sentence and adjective structures exist
          msg = "";
          document.getElementById("errMess").innerText=msg;
          if (proposal[0] !== "") { // replace current word
            proposal[0] = a;
            redraw();
      
          } else {
            proposal[0] = a;
            ctx.save();
            ctx.translate((diag.marg + 2 * diag.pad) * w, diag.base * h);
            ctx.rotate((45 * Math.PI) / 180);
            ctx.moveTo(0, 0);
            ctx.fillText(a, diag.fsize, 0);
            ctx.restore();
          }
        }
      
        displayErrorMsg(msg);
        //alert("drawAdj");
    }

    function drawAdv() {
        //alert("drawAdv");
    }

    function drawDirectObject(a) {
      var msg,
      w = can.width,
      h = can.height;
    if (!diag.sent) {
      msg = "You need a sentence structure first.";
      document.getElementById("errMess").innerText=msg;
    } else if (!diag.dobj) {
      msg = "You need a direct object structure first.";
      document.getElementById("errMess").innerText=msg;
    } else {
      // sentence and direct object structure exist
      msg = "";
      document.getElementById("errMess").innerText=msg;
      if (proposal[4] !== "") {
        // replace current word
        proposal[4] = a;
        redraw();
      } else {
        // draw new word
        proposal[4] = a;
        ctx.fillText(
          a,
          (diag.crossLocB + 2 * diag.pad) * w,
          (diag.base - diag.pad) * h
        );
      }
    }
    }

    function processChoice(event) {
        let sentOrigx= diag.crossLoc * can.width;
        let sentOrigy= diag.base * can.height;
        let dropX=event.offsetX;
        let dropY=event.offsetY;
        let e = sentDiag.elDragged;
         longestWord();
        //alert (`processChoice entered ${e}  ${dropX}  ${dropY}`);

        if (e===1){
          drawMainSentence();
        }else if (e===2) {
            drawDirectObjectLine();  
        }else if(e===3) {
            if (dropX < sentOrigx) {
                drawAdjLine();
            } else {
                drawModLine();
            }
        } else {
            let idx=e-4;
            if (dropY> sentOrigy){
             
            
            if (dropX< sentOrigx) {
                drawAdj(words[idx]);
            }else {
                drawMod(words[idx]);
            }
        } else {
            if (dropX < sentOrigx) {
                drawSubject(words[idx]);
            } else {
                if (diag.crossLoc==0.5) {
                    drawPredicate(words[idx]);
                } else {
                    if (dropX < 2 * sentOrigx) {
                       drawPredicate(words[idx]); 
                    } else {
                        drawDirectObject(words[idx]);
                    }
                }
            }
        }
    } 
        
    }

    function convertSentence() {
        var i, len, noPunct, singleSpace;

    noPunct = sentence.replace(/[^\w\s]/g, ""); 
    singleSpace = noPunct.replace(/\s{2,}/g, " ");
    words = singleSpace.split(/\s/); 
    sentence = singleSpace;
    document.getElementById("curSent").innerHTML = sentence;
    

    len = words.length;
    wordButtons = "";
    for (i = 0; i < len; i = i + 1) {
      wordButtons +=
        '<input type="button" value="' +
        words[i] +
        '" class="word" draggable="true" ondrag ="sentDiag.elDragged=' +
        (i + 4) +
        '"><br>';
    }
  }

  function displayDiagram() {
    diag.showing = true;
    document.getElementById("mainRshow").innerHTML = wordButtons;
    document.getElementById("mainRshow").style.display ="inline";
  }

  function checkProposal() {
    let cnt = 0;
    let fback = "";
    //let proposal = ["","","","",""];
    let anticipatedScore = document.getElementById("num");
    let msg = document.getElementById("errMess");
   if (words.length <=4) {
      msg= "This sentence should not have a direct object structure. Please click reset and begin again."
   }
     else if (diag.dobj) {
      msg= "This sentence should not have a direct object structure. Please click reset and begin again."
     }
     console.log(words.length);
     let i, len;
    for (i = 0, len = proposal.length; i < len; i++) {
      [words]=[proposal];
      console.log(words)
    }
    alert("Check Answer clicked");
  }
 
  function resetAll() {
    let proposal = ["","","","",""];
    
   let diag = {
     sent:0,
     adj: 0,
     mod: 0,
     dobj: 0,
     crossLoc: 0.5,
   }
   //for (let i =0; i <proposal.length; i++);{
    let i, len;
    for (i = 0, len = proposal.length; i < len; i++) {
    //for (i = 0, len = diag.length; i < len; i++) {
      [diag] = [proposal]; 
    console.log(diag); 
   console.log( "This number " + proposal[i])//}
   //redraw();
   //console.log(redraw());
    }
    redraw();
    console.log(redraw());
  //  document.getElementById("feedback").style.display = "none";
    document.getElementById("errMess").style.display = "none";
    document.getElementById("directions").style.display = "inline";
    alert("Reset clicked");
  }
 
  convertSentence();
  function setFontSize()  {
      let h = Math.round(can.height/16);
      let w = Math.round(can.width/16)
      diag.fsize = w<h?w:h ;
      ctx.font = diag.fsize + "px sans-serif";
      console.log(diag.fsize);
  }
    function longestWord  ()  {
        let longest = words.reduce(function(prev,crr) {
           return prev.length> crr.length? prev:crr
            
        })
        console.log(longest);
        return longest;
    }
  
  displayDiagram();
 

   function  displayErrorMsg()  {

   }
   function redraw() {
    var p = [];
  
    if (diag.showing) {
      can.width = window.innerWidth / 2 - 10;
      can.height = window.innerHeight / 2;
  
  
      setFontSize(); p = proposal;
      proposal = ["", "", "", "", ""];
  
  
      if (diag.sent) {
        diag.sent = 0;
        drawMainSentence();
        drawSubject(p[1]);
        drawPredicate(p[2]);
  
  
        if (diag.dobj) {
          diag.dobj = 0;
          drawDirectObjectLine();
          drawDirectObject(p[4]);
        }
  
  
        if (diag.adj) {
          diag.adj = 0;
          drawAdjLine();
          drawAdj(p[0]);
        }
  
  
        if (diag.mod) {
          diag.mod = 0;
          drawModLine();
          drawMod(p[3]);
        }
      }
    }
  }
  
  setFontSize();
  return {
    elDragged: elDragged,
    processChoice: processChoice,
    resetAll: resetAll,
    checkProposal: checkProposal,
  };
})();

function validInput()  {
    const message = document.getElementById("message1");
    message. innerHTML = "";
    let n = document.getElementById("fn").value;
    try {
        if (n=="") throw "fill out field";
        if (n < 100 || n > 100 || n==100 ) throw " correct field";
    }
    catch (err)  {
        message.innerHTML= "Please " + err;
    }
}
 
function validScore()  {
    const message = document.getElementById("message2");
    message. innerHTML = "";
    let x = document.getElementById("num").value;
    try  {
        if(x=="") throw "fill out field.";
        if(isNaN(x)) throw "enter correct input";
        if (x<0) throw "enter a score less than or equal to 100.";
        if (x>100) throw "enter a score less than or equal to 100.";
        else  {
            window.location.assign("page2.html");
        }
    }
    catch(err) {
        message.innerHTML = "Please " + err;
    }
}
$("#res").mousedown(function(){
  //var myElement = $("restext")
    $("body").css("background-color","green");
    //myElement.text("Reset Clicked");
  });
  $("#res").mouseup(function(){
    //var myElement = $("restext")
      $("body").css("background-color","white");
      //myElement.text("Reset Clicked");
    });


  
  