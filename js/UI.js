
var g_nodes ,g_selected, g_edges;


function isOnNode()
{  
    for (var i = 0; i < g_nodes.length; i ++)
    {
        if (g_nodes[i].onCircle(mouseX,mouseY))
        {
            g_nodes[i].selected = true
            return true;
        }

    }
    return false;
}

function addNode()
{   if ( (mouseX > 704) && (mouseY < 511))
    {
        let text = g_nodes.length;
        var m_node = new Node(mouseX,mouseY,45,text);
        g_nodes.push(m_node);
        myGraph.addVertex(m_node.text);
    }
    
    
}

function nodes_draw()
{
    for (var i = 0; i <g_nodes.length;i++)
    {
        g_nodes[i].m_draw();
    }
}

function edge_draw()
{
    for (var i = 0; i < g_edges.length;i++)
    {
        g_edges[i].drawLine();
    }
}



function addEdge()
{   
    if (g_selected.length == 2)
    {
        e_second = g_selected.pop();
        e_first = g_selected.pop();
        console.log(e_first.text + '->' + e_second.text);
        e_first.selected = false;
        e_second.selected = false;
        var new_edge = new Edge(e_first,e_second,true);
        myGraph.addEdge(e_first.text,e_second.text,new_edge);
        g_edges.push(new_edge);    
    }
}

//Drawing Logical Representation of Intermediate Node
function addIntermediateInfo(m_i,m_j,m_k,dp)
{   textSize(18);
    let rectfill = [30, 31, 43];
    let textfill = [250, 250, 185];
    noStroke();
    fill(rectfill);
    rect(705,510,541,258);
    let node1 = new Node(804,678,40,m_i);
    let node2 = new Node(950,561,40,m_k);
    let node3 = new Node(1096,678,40,m_j);

    let Edge1 = new Edge(node1,node2,false,dp[m_i][m_k]);
    let Edge2 = new Edge(node2,node3,false,dp[m_k][m_j]);
    let Edge3 = new Edge(node1,node3,false,dp[m_i][m_j]);

    Edge1.drawLine();
    Edge2.drawLine();
    Edge3.drawLine();
    
    node1.m_draw();
    node2.m_draw();
    node3.m_draw();

    let p_txt = null;    
    p_txt = dp[m_i][m_k] + '+'+ dp[m_k][m_j] + '<' + dp[m_i][m_j] + '?';
    textSize(18);
    noStroke();
    fill(255);
    text(p_txt,920,720);

}


//Drawing table after completion of algorithm
function drawTable()
{
 
    textSize(12);
    let rectfill = [255]
    let textfill = [51, 48, 45]
    let m_text = null
    let mul = parseInt(240/no_of_nodes);
    let mulX  = parseFloat(340/no_of_nodes);
    noStroke()
    fill(255)
    textSize(16);
    text('Next Table',415,150)
    text('Cost Table',415,505)

    textSize(12);
    
        for (var i = 0; i < no_of_nodes;i++)
    {
        for (var j = 0; j < no_of_nodes;j++)
        {   
            push();
            translate(330,165);
            stroke([66, 58, 112]);

            let x = (j) * mulX + 1;
            let y = (i) * mul + 1;
            let textX = (.5 + j) * mulX;
            let textY = (.5 + i) * mul;
            fill(rectfill);
            rect(x,y,mulX,mul);

            fill(textfill);
            if (next[i][j] == Infinity)
            {
                m_text = 'Inf';
            } else 
            {
                m_text = next[i][j];
            }
            stroke(0);
            text(m_text,textX,textY);
            pop();
            push();
            translate(330,520);
            stroke([66, 58, 112]);

            fill(rectfill);
            rect(x,y,mulX,mul);
            stroke(0);
            fill(textfill);
            if (dp[i][j] == Infinity)
            {
                m_text = 'Inf';
            } else 
            {
                m_text = dp[i][j];
            }
            text(m_text,textX,textY);
            pop();
        }
    }
    



}


function drawNext(next)
{
    textSize(12);
    let rectfill = [255]
    let textfill = [51, 48, 45]
    let m_text = null
    let mul = parseInt(240/no_of_nodes);
    let mulX  = parseFloat(340/no_of_nodes);
    noStroke()
    fill(255)
    textSize(16);
    text('Next Table',415,150)
    textSize(12);
    push();
    translate(330,165);
    for (var i = 0; i < no_of_nodes;i++)
    {
        for (var j = 0; j < no_of_nodes;j++)
        {   
            
            // noStroke();
            stroke([66, 58, 112]);

            let x = (j) * mulX + 1;
            let y = (i) * mul + 1;
            let textX = (.5 + j) * mulX;
            let textY = (.5 + i) * mul;
            fill(rectfill);
            rect(x,y,mulX,mul);

            fill(textfill);
            if (next[i][j] == Infinity)
            {
                m_text = 'Inf';
            } else 
            {
                m_text = next[i][j];
            }
            stroke(0);
            text(m_text,textX,textY);
        }
    }
    pop();
}

function drawDp(m_i,m_j,m_k,dp)
{   textSize(12);
    let rectfill = [255]
    let textfill = [51, 48, 45]
    let m_text = null
    let mul = parseInt(240/no_of_nodes);
    let mulX  = parseFloat(340/no_of_nodes);
    noStroke()
    fill(255)
    textSize(16);
    text('Cost Table',415,505)
    textSize(12);
    push();
    translate(330,520);
    for (var i = 0; i < no_of_nodes;i++)
    {
        for (var j = 0; j < no_of_nodes;j++)
        {   
            
            stroke([66, 58, 112]);
            let x = (j) * mulX + 1;
            let y = (i) * mul + 1;
            let textX = (.5 + j) * mulX;
            let textY = (.5 + i) * mul;
            fill(rectfill);
            rect(x,y,mulX,mul);

            fill(textfill);
            if (dp[i][j] == Infinity)
            {
                m_text = 'Inf';
            } else 
            {
                m_text = dp[i][j];
            }
            stroke(0);
            text(m_text,textX,textY);
        }
    }
     let c_k_x = (m_k) * mulX +1;
     let c_j_x = m_j * mulX + 1;
     let c_k_y = m_k * mul;
     let c_i_y = m_i * mul;
    noFill();
    push();
    strokeWeight(8);    
    stroke([125, 96, 17]);
    rect(c_k_x,c_i_y,mulX,mul); //i,k -> k ,i
    rect(c_j_x,c_k_y,mulX,mul);
    rect(c_j_x,c_i_y,mulX,mul);
    pop();
    pop();
    addIntermediateInfo(m_i,m_j,m_k,dp);
}

function findpath()
{
    if (g_selected.length == 2)
    {
        dest = g_selected.pop();
        src = g_selected.pop();
        path = constructPath(src.getText(),dest.getText(),dp,next);
        for (var i = 0; i < no_of_nodes;i++)
        {
            for (var j = 0; j < path.length;j++)
            {
                if (g_nodes[i].getText() == path[j])
                {
                    g_nodes[i].onPath = true;
                    break;
                }    
            }
        }   
    }
}


