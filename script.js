window.addEventListener("load",function() {

  //constants
    var GAME_WIDTH = 725;
    var GAME_HEIGHT = 375;
    var myMusic;


  //keep the game going
    var gameLive = true;


  //current level
    var level = 1;
    var life = 3;


  //random color 
    var color = "#"+((1<<24)*Math.random()|0).toString(16);


  //enemies
    var enemies = [
      {
        x: 112, //x coordinate
        y: 100, //y coordinate
        speedY: 2, //speed in Y
        w: 25, //width
        h: 33 //heght
      },
      {
        x: 190,
        y: 0,
        speedY: -2,
        w: 25,
        h: 33
      },
      {
        x: 375,
        y: 100,
        speedY: 3,
        w: 25,
        h: 33
      },
      {
        x: 587,
        y: 100,
        speedY: -3,
        w: 25,
        h: 33
      }
    ];


  //the player object
    var player = {
      x: 1,
      y: 157,
      speedX: 2,
      isMoving: false,  //keep track whether the player is moving or not
      w: 33,
      h: 25
    };


  //the goal object
    var goal = {
      x: 715,
      y: 155,
      w: 2,
      h: 65
    }

      var sprites = {};

      var movePlayer = function() {
        player.isMoving = true;
      }

      var stopPlayer = function() {
        player.isMoving = false;
      }
      

  //grab the canvas and context
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");


  //event listeners to move player
    canvas.addEventListener('mousedown', movePlayer);
    canvas.addEventListener('mouseup', stopPlayer);   
    canvas.addEventListener('touchstart', movePlayer);
    canvas.addEventListener('touchend', stopPlayer);   


  //update the logic
    var update = function() {

    //check if you've won the game
      if(checkCollision(player, goal)) {
    
        alert('5 stars rating, you Win!');
        level += 1;
        life += 1;
        player.speedX += 1;
        player.x = 10;
        player.y = 160;
        player.isMoving = false;
          
        for(var ab = 0; ab < enemies.length; ab++){
          if(enemies[ab].speedY > 1){
            enemies[ab].speedY += 1 ;
          }
          else{
            enemies[ab].speedY -= 1 ;
          }
        }
      }


        //update player
        if(player.isMoving) {
          player.x = player.x + player.speedX;
        }

        //update enemies
        var i = 0;
        var n = enemies.length;
        
        enemies.forEach(function(element, index){

          //check for collision with player
          if(checkCollision(player, element)) {
            //stop the game
            if(life === 0){
                
                alert('0 stars rating, you lost!');
                
                for(var ab = 0; ab < enemies.length; ab++){
                    
                    if(enemies[ab].speedY > 1){
                    enemies[ab].speedY -= (level - 1) ;
                    }
                    
                    else{
                        enemies[ab].speedY += (level - 1) ;
                    }
                }
                level = 1;
                life = 3;
                player.speedX = 2;
                color ="#"+((1<<24)*Math.random()|0).toString(16);
            }
            
            if(life > 0){
                
                life -= 1 ;
                color ="#"+((1<<24)*Math.random()|0).toString(16);
            }
            
            player.x = 10; 
            player.y = 160;
            player.isMoving = false;
          }

          //move enemy
          element.y += element.speedY;
          
          ctx.radians = 180 * (Math.PI/180)
          //check borders
          if(element.y <= 10) {
            element.y = 10;
            //element.speedY = element.speedY * -1;
            element.speedY *= -1;
          }
          else if(element.y >= GAME_HEIGHT - 50) {
            element.y = GAME_HEIGHT - 50;
            element.speedY *= -1;
          }
        });
      };


    //show the game on the screen
      var draw = function() {
        //clear the canvas
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);  


    //Draw the road
        //Horizontal road
          //Top road
            let roadTop = new Image();
            roadTop.src = "./images/roadTop_tile_0406.png";
            
            ctx.drawImage(roadTop, 0, 150, 25, 25);
            ctx.drawImage(roadTop, 25, 150, 25, 25);
            ctx.drawImage(roadTop, 50, 150, 25, 25);
            ctx.drawImage(roadTop, 75, 150, 25, 25);

            ctx.drawImage(roadTop, 150, 150, 25, 25);

            ctx.drawImage(roadTop, 225, 150, 25, 25);
            ctx.drawImage(roadTop, 250, 150, 25, 25);
            ctx.drawImage(roadTop, 275, 150, 25, 25);
            ctx.drawImage(roadTop, 300, 150, 25, 25);
            ctx.drawImage(roadTop, 325, 150, 25, 25);

            ctx.drawImage(roadTop, 425, 150, 25, 25);
            ctx.drawImage(roadTop, 450, 150, 25, 25);
            ctx.drawImage(roadTop, 475, 150, 25, 25);
            ctx.drawImage(roadTop, 500, 150, 25, 25);
            ctx.drawImage(roadTop, 525, 150, 25, 25);
            ctx.drawImage(roadTop, 550, 150, 25, 25);
            
            ctx.drawImage(roadTop, 625, 150, 25, 25);
            ctx.drawImage(roadTop, 650, 150, 25, 25);
            ctx.drawImage(roadTop, 675, 150, 25, 25);
            ctx.drawImage(roadTop, 700, 150, 25, 25);

            //Road corner (top)
              //Left corner
                let roadCornerTopLeft = new Image();
                roadCornerTopLeft.src = "./images/roadCornerTopLeft_tile_0467.png";
              
                ctx.drawImage(roadCornerTopLeft, 100, 150, 25, 25);

                ctx.drawImage(roadCornerTopLeft, 175, 150, 25, 25);

                ctx.drawImage(roadCornerTopLeft, 350, 150, 25, 25);

                ctx.drawImage(roadCornerTopLeft, 575, 150, 25, 25);

              //Right corner
                let roadCornerTopRight = new Image();
                roadCornerTopRight.src = "./images/roadCornerTopRight_tile_0466.png";
              
                ctx.drawImage(roadCornerTopRight, 125, 150, 25, 25);

                ctx.drawImage(roadCornerTopRight, 200, 150, 25, 25);

                ctx.drawImage(roadCornerTopRight, 400, 150, 25, 25);

                ctx.drawImage(roadCornerTopRight, 600, 150, 25, 25);


          //Bottom road
            let roadBottom = new Image();
            roadBottom.src = "./images/roadBottom_tile_0460.png";
            
            ctx.drawImage(roadBottom, 0, 200, 25, 25);
            ctx.drawImage(roadBottom, 25, 200, 25, 25);
            ctx.drawImage(roadBottom, 50, 200, 25, 25);
            ctx.drawImage(roadBottom, 75, 200, 25, 25);

            ctx.drawImage(roadBottom, 150, 200, 25, 25);

            ctx.drawImage(roadBottom, 225, 200, 25, 25);
            ctx.drawImage(roadBottom, 250, 200, 25, 25);
            ctx.drawImage(roadBottom, 275, 200, 25, 25);
            ctx.drawImage(roadBottom, 300, 200, 25, 25);
            ctx.drawImage(roadBottom, 325, 200, 25, 25);

            ctx.drawImage(roadBottom, 425, 200, 25, 25);
            ctx.drawImage(roadBottom, 450, 200, 25, 25);
            ctx.drawImage(roadBottom, 475, 200, 25, 25);
            ctx.drawImage(roadBottom, 500, 200, 25, 25);
            ctx.drawImage(roadBottom, 525, 200, 25, 25);
            ctx.drawImage(roadBottom, 550, 200, 25, 25);

            ctx.drawImage(roadBottom, 625, 200, 25, 25);
            ctx.drawImage(roadBottom, 650, 200, 25, 25);
            ctx.drawImage(roadBottom, 675, 200, 25, 25);
            ctx.drawImage(roadBottom, 700, 200, 25, 25);

            //Road corner (bottom)
              //Left corner
                let roadCornerBottomLeft = new Image();
                roadCornerBottomLeft.src = "./images/roadCornerBottomLeft_tile_0440.png";
              
                ctx.drawImage(roadCornerBottomLeft, 100, 200, 25, 25);

                ctx.drawImage(roadCornerBottomLeft, 175, 200, 25, 25);

                ctx.drawImage(roadCornerBottomLeft, 350, 200, 25, 25);

                ctx.drawImage(roadCornerBottomLeft, 575, 200, 25, 25);

              //Right corner
                let roadCornerBottomRight = new Image();
                roadCornerBottomRight.src = "./images/roadCornerBottomRight_tile_0439.png";
              
                ctx.drawImage(roadCornerBottomRight, 125, 200, 25, 25);

                ctx.drawImage(roadCornerBottomRight, 200, 200, 25, 25);

                ctx.drawImage(roadCornerBottomRight, 400, 200, 25, 25);

                ctx.drawImage(roadCornerBottomRight, 600, 200, 25, 25);

          
          //Middle road (horizontal)
            let roadMiddleVertical = new Image();
            roadMiddleVertical.src = "./images/roadMiddleVertical_tile_0433.png";
            
            ctx.drawImage(roadMiddleVertical, 0, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 25, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 50, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 75, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 100, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 125, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 150, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 175, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 200, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 225, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 250, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 275, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 300, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 325, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 350, 175, 25, 25);

            ctx.drawImage(roadMiddleVertical, 400, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 425, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 450, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 475, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 500, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 525, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 550, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 575, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 600, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 625, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 650, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 675, 175, 25, 25);
            ctx.drawImage(roadMiddleVertical, 700, 175, 25, 25);


        //Vertical road
          //Left road
            let roadLeft = new Image();
            roadLeft.src = "./images/roadLeft_tile_0461.png";
            
            ctx.drawImage(roadLeft, 100, 0, 25, 25);
            ctx.drawImage(roadLeft, 100, 25, 25, 25);
            ctx.drawImage(roadLeft, 100, 50, 25, 25);
            ctx.drawImage(roadLeft, 100, 75, 25, 25);
            ctx.drawImage(roadLeft, 100, 100, 25, 25);
            ctx.drawImage(roadLeft, 100, 125, 25, 25);

            ctx.drawImage(roadLeft, 100, 225, 25, 25);
            ctx.drawImage(roadLeft, 100, 250, 25, 25);
            ctx.drawImage(roadLeft, 100, 275, 25, 25);
            ctx.drawImage(roadLeft, 100, 300, 25, 25);
            ctx.drawImage(roadLeft, 100, 325, 25, 25);
            ctx.drawImage(roadLeft, 100, 350, 25, 25);


            ctx.drawImage(roadLeft, 175, 0, 25, 25);
            ctx.drawImage(roadLeft, 175, 25, 25, 25);
            ctx.drawImage(roadLeft, 175, 50, 25, 25);
            ctx.drawImage(roadLeft, 175, 75, 25, 25);
            ctx.drawImage(roadLeft, 175, 100, 25, 25);
            ctx.drawImage(roadLeft, 175, 125, 25, 25);

            ctx.drawImage(roadLeft, 175, 225, 25, 25);
            ctx.drawImage(roadLeft, 175, 250, 25, 25);
            ctx.drawImage(roadLeft, 175, 275, 25, 25);
            ctx.drawImage(roadLeft, 175, 300, 25, 25);
            ctx.drawImage(roadLeft, 175, 325, 25, 25);
            ctx.drawImage(roadLeft, 175, 350, 25, 25);


            ctx.drawImage(roadLeft, 350, 0, 25, 25);
            ctx.drawImage(roadLeft, 350, 25, 25, 25);
            ctx.drawImage(roadLeft, 350, 50, 25, 25);
            ctx.drawImage(roadLeft, 350, 75, 25, 25);
            ctx.drawImage(roadLeft, 350, 100, 25, 25);
            ctx.drawImage(roadLeft, 350, 125, 25, 25);

            ctx.drawImage(roadLeft, 350, 225, 25, 25);
            ctx.drawImage(roadLeft, 350, 250, 25, 25);
            ctx.drawImage(roadLeft, 350, 275, 25, 25);
            ctx.drawImage(roadLeft, 350, 300, 25, 25);
            ctx.drawImage(roadLeft, 350, 325, 25, 25);
            ctx.drawImage(roadLeft, 350, 350, 25, 25);


            ctx.drawImage(roadLeft, 575, 0, 25, 25);
            ctx.drawImage(roadLeft, 575, 25, 25, 25);
            ctx.drawImage(roadLeft, 575, 50, 25, 25);
            ctx.drawImage(roadLeft, 575, 75, 25, 25);
            ctx.drawImage(roadLeft, 575, 100, 25, 25);
            ctx.drawImage(roadLeft, 575, 125, 25, 25);

            ctx.drawImage(roadLeft, 575, 225, 25, 25);
            ctx.drawImage(roadLeft, 575, 250, 25, 25);
            ctx.drawImage(roadLeft, 575, 275, 25, 25);
            ctx.drawImage(roadLeft, 575, 300, 25, 25);
            ctx.drawImage(roadLeft, 575, 325, 25, 25);
            ctx.drawImage(roadLeft, 575, 350, 25, 25);


          //Right road
            let roadRight = new Image();
            roadRight.src = "./images/roadRight_tile_0463.png";
            
            ctx.drawImage(roadRight, 125, 0, 25, 25);
            ctx.drawImage(roadRight, 125, 25, 25, 25);
            ctx.drawImage(roadRight, 125, 50, 25, 25);
            ctx.drawImage(roadRight, 125, 75, 25, 25);
            ctx.drawImage(roadRight, 125, 100, 25, 25);
            ctx.drawImage(roadRight, 125, 125, 25, 25);

            ctx.drawImage(roadRight, 125, 225, 25, 25);
            ctx.drawImage(roadRight, 125, 250, 25, 25);
            ctx.drawImage(roadRight, 125, 275, 25, 25);
            ctx.drawImage(roadRight, 125, 300, 25, 25);
            ctx.drawImage(roadRight, 125, 325, 25, 25);
            ctx.drawImage(roadRight, 125, 350, 25, 25);


            ctx.drawImage(roadRight, 200, 0, 25, 25);
            ctx.drawImage(roadRight, 200, 25, 25, 25);
            ctx.drawImage(roadRight, 200, 50, 25, 25);
            ctx.drawImage(roadRight, 200, 75, 25, 25);
            ctx.drawImage(roadRight, 200, 100, 25, 25);
            ctx.drawImage(roadRight, 200, 125, 25, 25);
            
            ctx.drawImage(roadRight, 200, 225, 25, 25);
            ctx.drawImage(roadRight, 200, 250, 25, 25);
            ctx.drawImage(roadRight, 200, 275, 25, 25);
            ctx.drawImage(roadRight, 200, 300, 25, 25);
            ctx.drawImage(roadRight, 200, 325, 25, 25);
            ctx.drawImage(roadRight, 200, 350, 25, 25);


            ctx.drawImage(roadRight, 400, 0, 25, 25);
            ctx.drawImage(roadRight, 400, 25, 25, 25);
            ctx.drawImage(roadRight, 400, 50, 25, 25);
            ctx.drawImage(roadRight, 400, 75, 25, 25);
            ctx.drawImage(roadRight, 400, 100, 25, 25);
            ctx.drawImage(roadRight, 400, 125, 25, 25);
            
            ctx.drawImage(roadRight, 400, 225, 25, 25);
            ctx.drawImage(roadRight, 400, 250, 25, 25);
            ctx.drawImage(roadRight, 400, 275, 25, 25);
            ctx.drawImage(roadRight, 400, 300, 25, 25);
            ctx.drawImage(roadRight, 400, 325, 25, 25);
            ctx.drawImage(roadRight, 400, 350, 25, 25);


            ctx.drawImage(roadRight, 600, 0, 25, 25);
            ctx.drawImage(roadRight, 600, 25, 25, 25);
            ctx.drawImage(roadRight, 600, 50, 25, 25);
            ctx.drawImage(roadRight, 600, 75, 25, 25);
            ctx.drawImage(roadRight, 600, 100, 25, 25);
            ctx.drawImage(roadRight, 600, 125, 25, 25);
            
            ctx.drawImage(roadRight, 600, 225, 25, 25);
            ctx.drawImage(roadRight, 600, 250, 25, 25);
            ctx.drawImage(roadRight, 600, 275, 25, 25);
            ctx.drawImage(roadRight, 600, 300, 25, 25);
            ctx.drawImage(roadRight, 600, 325, 25, 25);
            ctx.drawImage(roadRight, 600, 350, 25, 25);


          //Middle road (vertical)
            let roadMiddleHorizontal = new Image();
            roadMiddleHorizontal.src = "./images/roadMiddleHorizontal_tile_0462.png";
            
            ctx.drawImage(roadMiddleHorizontal, 375, 0, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 25, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 50, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 75, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 100, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 125, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 150, 25, 25);

            ctx.drawImage(roadMiddleHorizontal, 375, 200, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 225, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 250, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 275, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 300, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 325, 25, 25);
            ctx.drawImage(roadMiddleHorizontal, 375, 350, 25, 25);

          //Road middle
            let roadMiddle = new Image();
            roadMiddle.src = "./images/roadMiddle_tile_0407.png";
            
            ctx.drawImage(roadMiddle, 375, 175, 25, 25);



      //Draw the sidewalk
        //Hozintal sideWalk
          let sidewalHorizontal = new Image();
          sidewalHorizontal.src = "./images/sidewalHorizontal_tile_0066.png";

          ctx.drawImage(sidewalHorizontal, 0, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 25, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 50, 125, 25, 25);

          ctx.drawImage(sidewalHorizontal, 0, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 25, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 50, 225, 25, 25);


          ctx.drawImage(sidewalHorizontal, 250, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 275, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 300, 125, 25, 25);

          ctx.drawImage(sidewalHorizontal, 250, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 275, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 300, 225, 25, 25);


          ctx.drawImage(sidewalHorizontal, 450, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 475, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 500, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 525, 125, 25, 25);

          ctx.drawImage(sidewalHorizontal, 450, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 475, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 500, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 525, 225, 25, 25);


          ctx.drawImage(sidewalHorizontal, 650, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 675, 125, 25, 25);
          ctx.drawImage(sidewalHorizontal, 700, 125, 25, 25);

          ctx.drawImage(sidewalHorizontal, 650, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 675, 225, 25, 25);
          ctx.drawImage(sidewalHorizontal, 700, 225, 25, 25);


        //Vertical sideWalk
          let sidewalkVertical = new Image();
          sidewalkVertical.src = "./images/sidewalkVertical_tile_0042.png";

          ctx.drawImage(sidewalkVertical, 75, 0, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 25, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 50, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 75, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 100, 25, 25);

          ctx.drawImage(sidewalkVertical, 75, 250, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 275, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 300, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 325, 25, 25);
          ctx.drawImage(sidewalkVertical, 75, 350, 25, 25);


          ctx.drawImage(sidewalkVertical, 150, 0, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 25, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 50, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 75, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 100, 25, 25);

          ctx.drawImage(sidewalkVertical, 150, 250, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 275, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 300, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 325, 25, 25);
          ctx.drawImage(sidewalkVertical, 150, 350, 25, 25);


          ctx.drawImage(sidewalkVertical, 225, 0, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 25, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 50, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 75, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 100, 25, 25);

          ctx.drawImage(sidewalkVertical, 225, 250, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 275, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 300, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 325, 25, 25);
          ctx.drawImage(sidewalkVertical, 225, 350, 25, 25);


          ctx.drawImage(sidewalkVertical, 325, 0, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 25, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 50, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 75, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 100, 25, 25);

          ctx.drawImage(sidewalkVertical, 325, 250, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 275, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 300, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 325, 25, 25);
          ctx.drawImage(sidewalkVertical, 325, 350, 25, 25);


          ctx.drawImage(sidewalkVertical, 425, 0, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 25, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 50, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 75, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 100, 25, 25);

          ctx.drawImage(sidewalkVertical, 425, 250, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 275, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 300, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 325, 25, 25);
          ctx.drawImage(sidewalkVertical, 425, 350, 25, 25);


          ctx.drawImage(sidewalkVertical, 550, 0, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 25, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 50, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 75, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 100, 25, 25);

          ctx.drawImage(sidewalkVertical, 550, 250, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 275, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 300, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 325, 25, 25);
          ctx.drawImage(sidewalkVertical, 550, 350, 25, 25);


          ctx.drawImage(sidewalkVertical, 625, 0, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 25, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 50, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 75, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 100, 25, 25);

          ctx.drawImage(sidewalkVertical, 625, 250, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 275, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 300, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 325, 25, 25);
          ctx.drawImage(sidewalkVertical, 625, 350, 25, 25);


        //Sidewalk corners
          //Sidewalk corner top right
            let sidewalkCornerTopRight = new Image();
            sidewalkCornerTopRight.src = "./images/sidewalkCornerTopRight_tile_0012.png";

            ctx.drawImage(sidewalkCornerTopRight, 75, 225, 25, 25);

            ctx.drawImage(sidewalkCornerTopRight, 325, 225, 25, 25);

            ctx.drawImage(sidewalkCornerTopRight, 550, 225, 25, 25);

          //Sidewalk corner top left
            let sidewalkCornerTopLeft = new Image();
            sidewalkCornerTopLeft.src = "./images/sidewalkCornerTopLeft_tile_0011.png";

            ctx.drawImage(sidewalkCornerTopLeft, 225, 225, 25, 25);

            ctx.drawImage(sidewalkCornerTopLeft, 425, 225, 25, 25);

            ctx.drawImage(sidewalkCornerTopLeft, 625, 225, 25, 25);

          //Sidewalk corner bottom right
            let sideWalkCornerBottomRight = new Image();
            sideWalkCornerBottomRight.src = "./images/sideWalkCornerBottomRight_tile_0039.png";

            ctx.drawImage(sideWalkCornerBottomRight, 75, 125, 25, 25);

            ctx.drawImage(sideWalkCornerBottomRight, 325, 125, 25, 25);

            ctx.drawImage(sideWalkCornerBottomRight, 550, 125, 25, 25);

          //Sidewalk corner bottom left
            let sidewalkCornerBottomLeft = new Image();
            sidewalkCornerBottomLeft.src = "./images/sidewalkCornerBottomLeft_tile_0038.png";

            ctx.drawImage(sidewalkCornerBottomLeft, 225, 125, 25, 25);

            ctx.drawImage(sidewalkCornerBottomLeft, 425, 125, 25, 25);

            ctx.drawImage(sidewalkCornerBottomLeft, 625, 125, 25, 25);

          //Sidewalk corner top round
            let sidewalkRoundTop = new Image();
            sidewalkRoundTop.src = "./images/sidewalkRoundTop_tile_0015.png";

            ctx.drawImage(sidewalkRoundTop, 150, 225, 25, 25);

          //Sidewalk corner bottom round
            let sideWalkRoundBottom = new Image();
            sideWalkRoundBottom.src = "./images/sideWalkRoundBottom_tile_0069.png";

            ctx.drawImage(sideWalkRoundBottom, 150, 125, 25, 25);



      //Draw the grass   
        let grassMiddle = new Image();
        grassMiddle.src = "./images/grassMiddle_tile_0028.png";
        ctx.drawImage(grassMiddle, 0, 0, 25, 25);
        ctx.drawImage(grassMiddle, 0, 25, 25, 25);
        ctx.drawImage(grassMiddle, 0, 50, 25, 25);
        ctx.drawImage(grassMiddle, 0, 75, 25, 25);
        ctx.drawImage(grassMiddle, 0, 100, 25, 25);

        ctx.drawImage(grassMiddle, 25, 0, 25, 25);
        ctx.drawImage(grassMiddle, 25, 25, 25, 25);
        ctx.drawImage(grassMiddle, 25, 50, 25, 25);
        ctx.drawImage(grassMiddle, 25, 75, 25, 25);
        ctx.drawImage(grassMiddle, 25, 100, 25, 25);

        ctx.drawImage(grassMiddle, 50, 0, 25, 25);
        ctx.drawImage(grassMiddle, 50, 25, 25, 25);
        ctx.drawImage(grassMiddle, 50, 50, 25, 25);
        ctx.drawImage(grassMiddle, 50, 75, 25, 25);
        ctx.drawImage(grassMiddle, 50, 100, 25, 25);



        ctx.drawImage(grassMiddle, 250, 0, 25, 25);
        ctx.drawImage(grassMiddle, 250, 25, 25, 25);
        ctx.drawImage(grassMiddle, 250, 50, 25, 25);
        ctx.drawImage(grassMiddle, 250, 75, 25, 25);
        ctx.drawImage(grassMiddle, 250, 100, 25, 25);

        ctx.drawImage(grassMiddle, 275, 0, 25, 25);
        ctx.drawImage(grassMiddle, 275, 25, 25, 25);
        ctx.drawImage(grassMiddle, 275, 50, 25, 25);
        ctx.drawImage(grassMiddle, 275, 75, 25, 25);
        ctx.drawImage(grassMiddle, 275, 100, 25, 25);

        ctx.drawImage(grassMiddle, 300, 0, 25, 25);
        ctx.drawImage(grassMiddle, 300, 25, 25, 25);
        ctx.drawImage(grassMiddle, 300, 50, 25, 25);
        ctx.drawImage(grassMiddle, 300, 75, 25, 25);
        ctx.drawImage(grassMiddle, 300, 100, 25, 25);


        ctx.drawImage(grassMiddle, 250, 250, 25, 25);
        ctx.drawImage(grassMiddle, 250, 275, 25, 25);
        ctx.drawImage(grassMiddle, 250, 300, 25, 25);
        ctx.drawImage(grassMiddle, 250, 325, 25, 25);
        ctx.drawImage(grassMiddle, 250, 350, 25, 25);

        ctx.drawImage(grassMiddle, 275, 250, 25, 25);
        ctx.drawImage(grassMiddle, 275, 275, 25, 25);
        ctx.drawImage(grassMiddle, 275, 300, 25, 25);
        ctx.drawImage(grassMiddle, 275, 325, 25, 25);
        ctx.drawImage(grassMiddle, 275, 350, 25, 25);

        ctx.drawImage(grassMiddle, 300, 250, 25, 25);
        ctx.drawImage(grassMiddle, 300, 275, 25, 25);
        ctx.drawImage(grassMiddle, 300, 300, 25, 25);
        ctx.drawImage(grassMiddle, 300, 325, 25, 25);
        ctx.drawImage(grassMiddle, 300, 350, 25, 25);



        ctx.drawImage(grassMiddle, 450, 0, 25, 25);
        ctx.drawImage(grassMiddle, 450, 25, 25, 25);
        ctx.drawImage(grassMiddle, 450, 50, 25, 25);
        ctx.drawImage(grassMiddle, 450, 75, 25, 25);
        ctx.drawImage(grassMiddle, 450, 100, 25, 25);

        ctx.drawImage(grassMiddle, 475, 0, 25, 25);
        ctx.drawImage(grassMiddle, 475, 25, 25, 25);
        ctx.drawImage(grassMiddle, 475, 50, 25, 25);
        ctx.drawImage(grassMiddle, 475, 75, 25, 25);
        ctx.drawImage(grassMiddle, 475, 100, 25, 25);

        ctx.drawImage(grassMiddle, 500, 0, 25, 25);
        ctx.drawImage(grassMiddle, 500, 25, 25, 25);
        ctx.drawImage(grassMiddle, 500, 50, 25, 25);
        ctx.drawImage(grassMiddle, 500, 75, 25, 25);
        ctx.drawImage(grassMiddle, 500, 100, 25, 25);

        ctx.drawImage(grassMiddle, 525, 0, 25, 25);
        ctx.drawImage(grassMiddle, 525, 25, 25, 25);
        ctx.drawImage(grassMiddle, 525, 50, 25, 25);
        ctx.drawImage(grassMiddle, 525, 75, 25, 25);
        ctx.drawImage(grassMiddle, 525, 100, 25, 25);


        ctx.drawImage(grassMiddle, 450, 250, 25, 25);
        ctx.drawImage(grassMiddle, 450, 275, 25, 25);
        ctx.drawImage(grassMiddle, 450, 300, 25, 25);
        ctx.drawImage(grassMiddle, 450, 325, 25, 25);
        ctx.drawImage(grassMiddle, 450, 350, 25, 25);

        ctx.drawImage(grassMiddle, 475, 250, 25, 25);
        ctx.drawImage(grassMiddle, 475, 275, 25, 25);
        ctx.drawImage(grassMiddle, 475, 300, 25, 25);
        ctx.drawImage(grassMiddle, 475, 325, 25, 25);
        ctx.drawImage(grassMiddle, 475, 350, 25, 25);

        ctx.drawImage(grassMiddle, 500, 250, 25, 25);
        ctx.drawImage(grassMiddle, 500, 275, 25, 25);
        ctx.drawImage(grassMiddle, 500, 300, 25, 25);
        ctx.drawImage(grassMiddle, 500, 325, 25, 25);
        ctx.drawImage(grassMiddle, 500, 350, 25, 25);

        ctx.drawImage(grassMiddle, 525, 250, 25, 25);
        ctx.drawImage(grassMiddle, 525, 275, 25, 25);
        ctx.drawImage(grassMiddle, 525, 300, 25, 25);
        ctx.drawImage(grassMiddle, 525, 325, 25, 25);
        ctx.drawImage(grassMiddle, 525, 350, 25, 25);



        ctx.drawImage(grassMiddle, 650, 0, 25, 25);
        ctx.drawImage(grassMiddle, 650, 25, 25, 25);
        ctx.drawImage(grassMiddle, 650, 50, 25, 25);
        ctx.drawImage(grassMiddle, 650, 75, 25, 25);
        ctx.drawImage(grassMiddle, 650, 100, 25, 25);

        ctx.drawImage(grassMiddle, 675, 0, 25, 25);
        ctx.drawImage(grassMiddle, 675, 25, 25, 25);
        ctx.drawImage(grassMiddle, 675, 50, 25, 25);
        ctx.drawImage(grassMiddle, 675, 75, 25, 25);
        ctx.drawImage(grassMiddle, 675, 100, 25, 25);

        ctx.drawImage(grassMiddle, 700, 0, 25, 25);
        ctx.drawImage(grassMiddle, 700, 25, 25, 25);
        ctx.drawImage(grassMiddle, 700, 50, 25, 25);
        ctx.drawImage(grassMiddle, 700, 75, 25, 25);
        ctx.drawImage(grassMiddle, 700, 100, 25, 25);


        ctx.drawImage(grassMiddle, 650, 250, 25, 25);
        ctx.drawImage(grassMiddle, 650, 275, 25, 25);
        ctx.drawImage(grassMiddle, 650, 300, 25, 25);
        ctx.drawImage(grassMiddle, 650, 325, 25, 25);
        ctx.drawImage(grassMiddle, 650, 350, 25, 25);

        ctx.drawImage(grassMiddle, 675, 250, 25, 25);
        ctx.drawImage(grassMiddle, 675, 275, 25, 25);
        ctx.drawImage(grassMiddle, 675, 300, 25, 25);
        ctx.drawImage(grassMiddle, 675, 325, 25, 25);
        ctx.drawImage(grassMiddle, 675, 350, 25, 25);

        ctx.drawImage(grassMiddle, 700, 250, 25, 25);
        ctx.drawImage(grassMiddle, 700, 275, 25, 25);
        ctx.drawImage(grassMiddle, 700, 300, 25, 25);
        ctx.drawImage(grassMiddle, 700, 325, 25, 25);
        ctx.drawImage(grassMiddle, 700, 350, 25, 25);



      // draw buildings
        let buildingCornerLeft = new Image();
        buildingCornerLeft.src = "./images/tile_0081.png";
        //ctx.drawImage(buildingCornerLeft, 0, 250, 25, 25);

        let building = new Image();
        building.src = "./images/tile_0082.png";
        ctx.drawImage(building, 0, 250, 25, 25);
        ctx.drawImage(building, 25, 250, 25, 25);


        let buildingCornerRight = new Image();
        buildingCornerRight.src = "./images/tile_0083.png";
        ctx.drawImage(buildingCornerRight, 50, 250, 25, 25);


        let buildingRight = new Image();
        buildingRight.src = "./images/tile_0110.png";
        ctx.drawImage(buildingRight, 50, 275, 25, 25);
        ctx.drawImage(buildingRight, 50, 300, 25, 25);
        ctx.drawImage(buildingRight, 50, 325, 25, 25);
        ctx.drawImage(buildingRight, 50, 350, 25, 25);


        let buildingRight1 = new Image();
        buildingRight1.src = "./images/tile_0137.png";
        // ctx.drawImage(buildingRight1, 50, 325, 25, 25);


        let buildingMiddle = new Image();
        buildingMiddle.src = "./images/tile_0109.png";
        ctx.drawImage(buildingMiddle, 0, 275, 25, 25);
        ctx.drawImage(buildingMiddle, 0, 300, 25, 25);
        ctx.drawImage(buildingMiddle, 0, 325, 25, 25);
        ctx.drawImage(buildingMiddle, 0, 350, 25, 25);
        ctx.drawImage(buildingMiddle, 25, 275, 25, 25);
        ctx.drawImage(buildingMiddle, 25, 300, 25, 25);
        ctx.drawImage(buildingMiddle, 25, 325, 25, 25);
        ctx.drawImage(buildingMiddle, 25, 350, 25, 25);
        


    //draw level
        ctx.font = "11px Verdana";
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText("Level : " + level , 5, 12);
        ctx.fillText("Speed : " + player.speedX , 5, 24);
        ctx.fillText("Life : " + life , 5, 36);
        

    //draw player car (with random color)
        ctx.fillStyle = "#ffffff00" //color;
        ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.translate(0,0);
        let image = new Image();
        image.src = "./images/uber.png";
        ctx.drawImage(image, player.x, player.y, player.w, player.h);


    //draw enemies aka the police
        // ctx.fillStyle = "rgb(255,120,70)";
        let police = new Image();
        police.src = "./images/taxi.png";
        enemies.forEach(function(element, index){
          ctx.fillStyle = "rgb(255,120,70)";  
        //  ctx.fillRect(element.x, element.y, element.w, element.h);
        ctx.save()
          ctx.translate(0,0);
         ctx.drawImage(police, element.x, element.y, element.w, element.h);
          });
          
          ctx.restore()
        

    //draw goal
        ctx.fillStyle = "#ffff00"; //rgb(0,255,120);
        ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
        //ctx.fillStyle = "rgb(0,0,0)";
        //ctx.fillText("Goal", goal.x + 7, goal.y + 25);
      };


    //gets executed multiple times per second
      var step = function() {

        update();
        draw();

        if(gameLive) {
          window.requestAnimationFrame(step); 
        }     
      };

    //check the collision between two rectangles
      var checkCollision = function(rect1, rect2) {

        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        return closeOnWidth && closeOnHeight;
      }

    //initial kick
      step();
});


//To start the game
  function startGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("landing").style.display = "none";
    myMusic = new sound("./Pixel Car Racer - Engine sounds.mp3");
    myMusic.play();
    canvas.start();
  }