import React,{Component} from "react";
import api from '../../services/api';
import './styles.css';
import{Link} from 'react-router-dom';
import  utils from '../../util/util'

export default class Product extends Component{
    state={
        product:[],
       productInfo:{},
       cont:Number,item:null,qt:0,
    }

 

    async componentDidMount(){
        const {id} =this.props.match.params;
        const response=await api.get(`/product/${id}`);

        this.setState({product:response.data});
    }
    
    render(){
          let{product,item,qt,cont}=this.state;
          let vr = localStorage.getItem('@hutweb/carrinho');

         if(vr==null){
            vr='{"docs": []}';
            localStorage.setItem('@hutweb/carrinho',vr);
         }
         vr = localStorage.getItem('@hutweb/carrinho');
         vr=JSON.parse(vr);
          vr=vr.docs;
          vr=Object.keys(vr).length;
          qt=vr;
        

  const showEvent = () =>{
  let productAr=true;
  let vr = localStorage.getItem('@hutweb/carrinho');
  vr=JSON.parse(vr);
  vr=vr.docs;
  vr.forEach(it => {
      if (it.item === item && it._id===product._id) {
        it.ped += 1;
        this.setState({cont:it.ped});
        productAr = false;
        }
    });
  let qAt=Object.keys(vr).length;
   if(productAr){
      product.item=item;
      product.ped=1;
      product.key=qAt;
      vr.push(product);
      this.setState({cont:1});
     }
     
   qAt=Object.keys(vr).length;
   this.setState({qt:qAt});     
   vr= JSON.stringify(vr);
   vr='{"docs":'+vr+'}';
   localStorage.setItem('@hutweb/carrinho',vr);    
   }

            const btG= () =>{
             this.setState({item:'(G)'});
             this.setState({cont:Number});
            }  


            const btM= () =>{
             this.setState({item:'(M)'});
             this.setState({cont:Number});
            }         
            
            
            const btP= () =>{
              this.setState({item:'(P)'});
              this.setState({cont:Number});
            }     

return(
        <div className="product-info">
        <div className="perfil">
        <Link to={`/carrinho`}><i className='fa fa-shopping-cart fa-3x'></i></Link>
        <img alt='0' src={product.url} ></img>
        <button disabled={product.qtp===0} onClick={btP}>P</button>
        <button disabled={product.qtm===0} onClick={btM}>M</button>
        <button disabled={product.qtg===0} onClick={btG}>G</button>
        </div>
        <div className="detalhe">
        {product.title===undefined||product.title===""? (<h1>aguarde</h1>):(<h1>{product.title}</h1>)}{item}{cont!==Number &&(<strong>{cont}</strong>)}
        {product.description===undefined||product.description==="" ? (<p>aguarde..</p>):(<p>{utils.formatCurrency(product.description)}</p>)}
        { product.des===undefined ||product.des===""  ? ( <p>aguarde</p>) :(  <p>{product.des!==0&&(<p>{utils.formatDescunt(product.des)}</p>)}</p>) }
        <button  onClick={showEvent}disabled={item===null}><i className='fa fa-shopping-bag fa-xs' aria-hidden='true'></i> Adicionar {qt}</button>
        <div className="comprar">
        <button  disabled={item===null}> <i className='fa fa-tag fa-xs' aria-hidden='true'></i> Comprar </button>
        </div>
       </div>
        </div>
         );
    }
}