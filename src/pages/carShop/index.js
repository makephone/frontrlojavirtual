import React,{Component} from "react";
import './styles.css';
import{Link} from 'react-router-dom';
import  utils from '../../util/util';
export default class Product extends Component{
state={
product:[],
productInfo:{},
page:1,item:null,qt:0,
}

shouldComponentUpdate(nes,pr){
if(this.state.qt !==nes.qt){
return true;
}
return false;
}

render(){
let vr = localStorage.getItem('@hutweb/carrinho');
const g=0;
const dm=1;
const canc=2;
if(vr==null){
vr='{"docs": []}';
localStorage.setItem('@hutweb/carrinho',vr);
}
vr = localStorage.getItem('@hutweb/carrinho');
vr=JSON.parse(vr);
vr=vr.docs;
let total =0;


vr.forEach(it => {
         total+=it.ped*parseFloat(it.description);

          }
  );

const btG= (u,f) =>{
let vr1 = localStorage.getItem('@hutweb/carrinho');
vr1=JSON.parse(vr1);
vr1=vr1.docs;
switch (f){
    case 0:
        let count=vr1[u].ped;
        vr1[u].ped=count+1;
        break;
    case 1:    
    let count1=vr1[u].ped;
    if(count1>1){
    vr1[u].ped=count1-1;
    }
    break;

    case 2:
    vr1.splice(u,1);
    break
    default:
}
let cache1= JSON.stringify(vr1);
cache1='{"docs":'+cache1+'}';
localStorage.setItem('@hutweb/carrinho',cache1);
this.setState( state => ({qt:state.qt+1}))
}  
return(
<section className="feed">
<div className="container">

  {Object.keys(vr).length===0 &&(<div className='vazio'><h1>Carrinho Vazio. </h1></div>)}  
{
vr.map((product,index)=>(
<article className="post" key={index}>
<figure className="post__img">
<img src={product.url} alt={product.key}></img>
<div>
<p>{product.title}  {product.item}</p>
<p> R$ {product.description}</p>
</div>
</figure>
<nav className="post__buttons">
<div className="post__buttons__container">
<button onClick={()=>btG(index,g)} className="post__button"><i className='fa fa-chevron-circle-up fa-3x'></i></button>   
<p> {product.ped}</p> 
<button onClick={()=>btG(index,dm)} className="post__button"><i className='fa fa-chevron-circle-down fa-3x'></i></button> 
<button onClick={()=>btG(index,canc)} className="post__button"><i className='fa fa-trash fa-3x'></i></button> 
</div>    
</nav>
 </article>
))}
<h1>Total:{utils.formatTotal(total)} </h1>   
<button className="buttonarias">Comprar</button>  
<Link to={`/`}><i className='fa fa-home fa-3x'></i></Link>
</div>
</section>
);
}
}