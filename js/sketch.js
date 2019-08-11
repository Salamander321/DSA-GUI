var loop_d;
var no_input;
var input_mode,animated;
var output; //for displaying adjanceny matrix
var findPathMode;
var edge_input,set_button;
var a_i,a_j,a_k;

var resetButton,runButton,createMaxButton,findPathButton,pauseButton;

function initVariables()
{
    no_input = false;  
    input_mode = true; //for input_mode
    animated = false; //for animation
    output = false; //for displaying table
    loop_d = true;
    findPathMode = false; //for main loop 
    a_i = 0;//for counter
    a_j = 0;//for counter
    a_k = 0;//for counter
    no_of_nodes = null;
     dp = []
     myGraph = new Graph;
     next = [];
    matrix = null;
    g_edges = [];
    g_nodes = [];
    g_selected = [];
}


function toggleLoop()
{
    if (loop_d)
    {
        noLoop();
        loop_d = false;
    } else {
        loop_d = true;
        loop();
    }
}
function myInputEvent() {
    console.log('you are typing: ', this.value());
  }
function setup()
{
    createCanvas(1280,768);
    background([4, 5, 33]);
    initVariables();
    fill([30, 31, 43]);
    rect(705,510,541,258);
    createMaxButton = createButton('Create Matrix');
    createMaxButton.style('button');
    resetButton = createButton('Reset');
    runButton = createButton('Run');
    pauseButton = createButton('Pause');
    createMaxButton.position(48,188);
    runButton.position(48,297);
    pauseButton.position(48,406)
    resetButton.position(48,515);
    findPathButton = createButton('Find Path');
    findPathButton.position(48,624);
    createMaxButton.style('button')
    createMaxButton.mousePressed(createButPressed);
    runButton.mousePressed(runAnimation);
    pauseButton.mousePressed(onPause);
    resetButton.mousePressed(reset);
    findPathButton.mousePressed(toFindPath);


}

function draw()
{   
    
    fill([17, 3, 48])
    rect(0,62,1280,45);
    textSize(20);
    fill(255)
    text('Logical Graph Representation',840,95);
    push();
    textSize(30);
    fill(255)
    text('Floyd-Warshall Algorithm',25,45);
    pop();
    textSize(20);
    text('Adjanceny Matrix Representation',350,95);
    textSize(12);
    noStroke();
    fill(0);
    rect(705,107,541,403)
    fill([29, 32, 66])
    rect(305,107,400,660);
    if (input_mode){
        addEdge();
    }
    edge_draw();
    nodes_draw();
   if (animated)
   {
        frameRate(10);
        drawNext(next);
        drawDp(a_i,a_j,a_k,dp);
        if((dp[a_i][a_k] + dp[a_k][a_j]) <dp[a_i][a_j])
        {   
            dp[a_i][a_j] = dp[a_i][a_k] + dp[a_k][a_j];
            next[a_i][a_j] = next[a_i][a_k];
            drawDp(a_i,a_j,a_k,dp);
    }
    returned = getIndex(a_i,a_j,a_k,no_of_nodes);
    a_i = returned[0];
    a_j = returned[1];
    a_k = returned[2];
    }
    if (output)
    {
        drawTable();
    }
}

function mousePressed()
{  
    // toggleLoop();
    console.log(mouseX,mouseY)
    if (!isOnNode() && input_mode)
    {
        addNode();
    }
}

function mouseReleased()
{
    
}
function changeMode()
{
    input_mode = false;
    animated = true;
    no_input = true;
}

function createButPressed()
{
    createMatrix();
    ConvertMatrix();
    setupMatrix();
    input_mode = false;
    console.log('createButPressed');    
    output = true;
}
function runAnimation()
{   
    if (!loop_d)
    {
        toggleLoop();
    }
    output = false;
    animated = true;
}

function onPause()
{
    if(loop_d)
    {
        toggleLoop();
    }
}

function reset()
{   
    if(!loop_d)
    {
        toggleLoop();
    }
   initVariables();
}

function toFindPath()
{
    if (g_selected.length > 0)
    {
        findpath()
    }
    else 
    {
        for (var i = 0; i < no_of_nodes;i++)
        {
            g_nodes[i].selected = false;
            g_nodes[i].onPath = false;
        }
    }
}