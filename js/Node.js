class Node{
    constructor(x,y,d,text)
    {
        this.m_x = x;
        this.m_y = y;
        this.m_r = d/2;
        this.m_d = d;
        this.selected = false;
        this.text =  text;
        this.onPath = false;
    }

    onCircle(x,y)
    {
        if (distance(x,y,this.m_x,this.m_y) <= this.m_r)
        {
            this.toggleSelected();
            g_selected.push(this)
            return true;
        }
        return false;
    }

    m_draw()
    {   
        noStroke();
        if (this.selected)
        {
            fill(180,230,86)
        } else if (this.onPath)
        {
            fill(65, 77, 32);
        } 
        else {
            fill(255);
        }
        ellipse(this.m_x,this.m_y,this.m_d,this.m_d);
        textSize(12);
        fill(0)
        text(this.text,this.m_x-5,this.m_y+3);       
    }
    toggleSelected()
    {
        if (this.selected == true)
        {
            this.selected = false;
        } else {
            this.selected = true;
        }
    }
    deselect()
    {
        this.selected = false
    }
    getX()
    {
        return this.m_x;
    }
    getY()
    {
        return this.m_y;
    }
    getText()
    {
        return parseInt(this.text);
    }
}

function distance(x1,y1,x2,y2)
{
    let x = Math.pow(x2-x1,2);
    let y = Math.pow(y2-y1,2);
    return Math.sqrt(x+y);
}