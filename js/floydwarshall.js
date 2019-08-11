
function sleep( millisecondsToWait )
{
var now = new Date().getTime();
while ( new Date().getTime() < now + millisecondsToWait )
{
/* do nothing; this will exit once it reaches the time limit */
/* if you want you could do something and exit */
}
// console.group('called sleep');
}

//global variables
var no_of_nodes,dp,myGraph,next,matrix;

//Default for testing
var m = [
    [0,Infinity,Infinity,9,Infinity,Infinity,Infinity,Infinity],
    [Infinity,0,8,Infinity,Infinity,Infinity,Infinity,Infinity],
    [Infinity,Infinity,0,Infinity,3,5,5,Infinity],
    [Infinity,Infinity,Infinity,0,Infinity,Infinity,Infinity,Infinity],
    [Infinity,Infinity,Infinity,Infinity,0,Infinity,Infinity,Infinity],
    [Infinity,Infinity,Infinity,3,Infinity,0,Infinity,6],
    [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,0,4],
    [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,1,0]
]

//Adjancency Matrix Representation
function createMatrix()
{
    let n = g_nodes.length;
    no_of_nodes = n;
    matrix = new Array(n);
    for (var i = 0; i < n;i++){
        matrix[i] = new Array(n);
    }

    for (var i = 0; i < n;i++)
    {
        for(var j = 0; j < n;j++)
        {
            if(i == j)
            {   console.log(0);
                matrix[i][j] = 0;
            } else
            {   console.log(Infinity);
                matrix[i][j] = Infinity;
            }
        }
    }
}

//Converting List into Matrix
function ConvertMatrix()
{
    let n = g_edges.length;
    for (var i = 0; i < n;i++)
    {
        src = g_edges[i].m_src.getText();
        dest = g_edges[i].m_dest.getText();
        matrix[src][dest] = g_edges[i].get_weight();
    }


}

//Setup for solving APSP
function setupMatrix()
{
    let n = g_nodes.length;
    dp = new Array(n);
    next = new Array(n);
    for (var i = 0; i < n;i++)
{   dp[i] = new Array(n);
    next[i] = new Array(n);
    for (var j = 0; j < n;j++)
    {
        dp[i][j] = matrix[i][j];
        if (matrix[i][j] != Infinity)
        {
            next[i][j] = j;
        }
    }
}
}

//floyd-warshall main implementation
function APSP_warshall(dp,next)
{  
    for (var k = 0; k < 8;k++)
{
    for (var i = 0; i < 8;i++)
    {  
        for (var j = 0;j < 8;j++)
        {   
            if((dp[i][k] + dp[k][j]) <dp[i][j])
            {   
                dp[i][j] = dp[i][k] + dp[k][j];
                next[i][j] = next[i][k];
            }
        }
    }
}
}

//construction of path
function constructPath(start,end,dp,next)
{   
    let t_start = parseInt(start);
    let t_end = parseInt(end);
    let path = []
    if (dp[t_start][t_end] == Infinity)
    {
        return path
    }
    let at = t_start
    path.push(at);
    while (at != t_end)
    {
        console.log(at);
        at = next[at][end]
        path.push(at);
    }
    console.log(path);
    return path
}


// APSP_warshall(dp,next);
function delay()
{
    console.log('delay function called');
}

//GUI implementation
// function warshall_animation(dp,next,n,i,j,k)
// {   //component for visualisation of implementation

//     for (var k = 0; k < 8;k++)
// {
//     for (var i = 0; i < 8;i++)
//     {
//         for (var j = 0;j < 8;j++)
//         {  
//             drawDp(i,j,k,dp);
//             redraw();
//             sleep(500);
        
//             if((dp[i][k] + dp[k][j]) <dp[i][j])
//             {   
//                 dp[i][j] = dp[i][k] + dp[k][j];
                
//                 next[i][j] = next[i][k];
//                 drawDp(i,j,k,dp);
//                 redraw();
//                 sleep(500);
                
//             }
//         }
//     }
// }
// }

function getIndex(i,j,k,n)
{
    j = j + 1
    if (j >=n)
    {
        j = 0;
        i = i + 1;
    }
    if (i >= n)
    {
        i = 0;
        k = k + 1;
    }
    if (k >= n)
    {
        k = 0;
        animated = false;
        output = true;
    }
    return [i,j,k];
} 
