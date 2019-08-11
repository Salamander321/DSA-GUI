class Graph
{
    constructor(noOfvertices = 15,directed = true)
    {
        this.m_vertices = noOfvertices;
        this.AdjList =  new Map();
        this.m_directed = directed;
        this.g_AdjList = new Map();
    }

    addVertex(v)
    {  
        this.AdjList.set(v,[]);
        this.g_AdjList.set(v,[])
    }

    addEdge(u,v,edge)
    {
        this.AdjList.get(u).push(v)
        this.g_AdjList.get(u).push(edge);
        if(!this.m_directed)
        {
            this.AdjList.get(v).push(u)
        }
    }

    display()
    {   
        let keys = this.AdjList.keys()
        console.log(keys)
        for (let k of keys)
        {   let value = this.AdjList.get(k)
            let vertices = " ";
            
            for (let v of value)
            {
                vertices+= v + " ";
            }
            console.log(k + " -> " + vertices);
        }
    }

    getEdge(u)
    {
        return this.g_AdjList.get(u);
    }
}


