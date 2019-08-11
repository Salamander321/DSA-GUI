function onSetButton()
{   
    let value = edge_input.value();
    edge_input.hide();
    set_button.hide();
    console.log(value);
    return value;

}


class Edge{

    constructor(src,dest,input = false,weight = 0) {
        this.m_src = src;
        this.m_dest = dest;
        this.m_input = input;
        if (input)
        {
            this.m_weight = prompt('Enter a weight');    
        } else {
            this.m_weight = weight
        }
        this.span1X = (parseFloat(this.m_src.getX()) - this.midX)
        this.span1Y = (parseFloat(this.m_src.getY()) - this.midY)
        this.length = Math.sqrt(this.span1X * this.span1X + this.span1Y * this.span1Y)
        this.spanX = 10 * (this.span1X / this.length)
        this.spanY = 10 * (this.span1Y / this.length)
        
    }

    drawLine()
    {
        let x1 = this.m_src.getX();
        let x2 = this.m_dest.getX();
        let y1 = this.m_src.getY();
        let y2 = this.m_dest.getY();
        let midX = (x1+x2)/2;
        let midY = (y1+y2)/2;
        let Slope = (y2-y1)/(x2-x1);

        let offset = null
        if (this.Slope < 0) {
            if ((parseFloat(this.m_dest.getY()) - parseFloat(this.m_src.getY())) > 0)
                this.Slope = Math.PI + this.Slope
        }
        else {
            if ((parseFloat(this.m_dest.getY()) - parseFloat(this.m_src.getY())) < 0)
                this.Slope = Math.PI + this.Slope
        }
        if (this.m_input == true)
        {
            push();
            strokeWeight(2);
            stroke(255);
            line(x1,y1,x2,y2);
            pop();

        } else{
            
            push();
            strokeWeight(2);
            stroke(255);
            line(x1,y1,x2,y2);
            pop();

        }
        if (Slope >= 0)
        {
            offset = 1
        } else {
            offset = -1
        }
        push();
        textSize(13);
        fill(255);
        if (this.m_weight == Infinity)
        {
            text('Inf',midX - 15,midY + offset * 10) 
        } else{
        text(this.m_weight,midX - 15,midY + offset * 10);
        }
        pop();


        push() //start new drawing state
            let m_offset = this.m_dest.m_r;
            let m_angle = atan2(y2 - y1, x2 - x1); //gets the angle of the line
            translate(midX, midY); //translates to the destination vertex
            rotate(m_angle-HALF_PI); //rotates the arrow point
            fill(255);
            triangle(-m_offset*0.25, m_offset, m_offset*0.25, m_offset, 0, m_offset*3); //draws the arrow point as a triangle
            pop();
        

    }
    get_input()
    {  

    }
   
    show_weight()
    {
        console.log(this.weight);
    }
    get_weight()
    {
        return parseFloat(this.m_weight);
    }
    drawPath()
    {
        let x1 = this.m_src.getX();
        let x2 = this.m_dest.getX();
        let y1 = this.m_src.getY();
        let y2 = this.m_dest.getY();
        let midX = (x1+x2)/2;
        let midY = (y1+y2)/2;
        let Slope = (y2-y1)/(x2-x1);

        push();
        strokeWeight(10);
        stroke([207, 237, 109]);
        line(x1,y1,x2,y2);   
        pop();
    }

}