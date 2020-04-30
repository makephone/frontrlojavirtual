import React ,{Component} from 'react'; //impoct padrao do react
import api from '../../services/api'; //importamos a api com axioss
import './styles.css';  //importamos o css
import Products from '../../components/ListProducts/Products';   //importamos o componete Product
import{Link} from 'react-router-dom';
import { connect } from 'react-redux';  //importamos o connect

class Main extends Component{       //classe Main da pagina principal recebe a herança da classe componente  

state={                     //variaveis de estado declaradas
    product:[], //array
    productInfo:{},//objeto
    page:Number,//inteiro
    count:Number,//inteiro
    }

componentDidMount(){                    //ciclo de vida do componente invocado depois de renderiza      
    const{count}=this.props;            //a variavel count recebe o valor inteiro indicado qual pagina o usuario para o redux
    this.setState({page:count})        //setamos  a pagina  atualizado a variavel de estado page   
    this.loadProducts(count);         //enviamos o parametro para a função loadproducts carrega os produtos daquela pagina 
}
loadProducts=async(page)=>{
     const response=await api.get(`products/vestido/${page}`);    //pegamos os dados com o axios atraves de um request
     const {docs}=response.data;                                  //transpormamos o array data para a constante docs
     const {...productInfo}=response.data;                        //simultaneamento para productInfo
     this.setState({product:docs,productInfo:productInfo,page:page}); //setamos a variavel de estado 
};

    prevPage=()=>{                       //declaramos a função para retorna pagina
        const {page}=this.state;        // declaramos a constate page que recebe o estado da variavel page 
        if(page===1) return;           // uma simples verificação se a variavel de paginação já esta na pagina inicial se sim retorna
        const pageNumber=page-1;       //declaramos a constate pageNumber que recebera o valor de page -1
        this.loadProducts(pageNumber);  //invocamos a função loadProducts informado qual pagina devo usa 
        this.props.dispatch({ type: 'DECREMENT' });   // atualiza a variavel de controle de pagina no redux
    }

    nextPage=()=>{                            //declaro a função  para ir para proxima pagina
        const {page,productInfo}=this.state;  //declaro as constates page,producInfo que receberão os valores das variaveis de estado 
        if(page === productInfo.pages)return; // uma estrutura de decisão pergutando se já estamos na ultima pagina das paginações se sim retorna
        const pageNumber = page+1;            //caso não seje a ultima pagina declara a constate pageNumber que recebe o valor de page+1
        this.loadProducts(pageNumber);        //invocamos a  função page loadPRODUCTS informado qual pagina vai carregar 
        this.props.dispatch({ type: 'INCREMENT' });  //atualiza o redux da variavel cont incrementando
    }


    valorInput=async(e)=> {                 //declaramos a  função valorInput como 
    let{value}=e.target;                    //capturamos o valor digitado no formulario  
    const {page}=this.state;                //declaramos a constate page a variavel de estado page
    if(value===""){                         //verificamos se o usuario apagou oque digitou      
    value="vestido";                        // definimos que o parametro de busca são todos os vestidos
    }
    this.setState({page:1})                 //setamos a variavel de estado da pagina para o valor de 1     
    const response=await api.get(`products/${value}/1`); //enviamos uma requisição no axios procurando para o mongodb os 9 primeiros registros com o valor       
    const {docs}=response.data;                          //a variavel docs recebe a resposta  captura a resposta do array data 
    const {...productInfo}=response.data;                //  transfere os valores para a constate product info 
    this.props.dispatch({ type: 'RESET' });              //fazemos o redux da vaviavel conte um reset para seu valor inicial 1  
    this.setState({product:docs,productInfo:productInfo,page:page});  //setamos a variavel de estado com os valores recebidos 
   }



 render(){                                              //declaramos o metodo render do react
const {page,productInfo} =this.state;                   // definimos a variavel page e product info que usaremos dentro do metodo
 return (                                               //definimos o método de retorno do react
 <div className='corpo'>                                
 <Link to={`/carrinho`}><i className='fa fa-shopping-cart fa-3x'></i></Link>
<div className="seach">
<form>
<input type='text' placeholder='O Que Deseja' onChange={this.valorInput}></input>
<button><i className='fa fa-search fa-3x'></i></button>
</form>
</div>
<Products  products={this.state.product}/>
<div className="act">
 <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
 <button disabled={page===productInfo.pages} onClick={this.nextPage}>Próximo</button>
 </div>
</div>
);
}
}


function mapStateToProps(state) { // declaramos a função que recebe o valor de conter do redux counter
    console.log('voltou!')        //controle de redux com log
    console.log(state.counter.count);    //imprime o valor retornado
     return {count: state.counter.count}; // retorna o valor de retorno a variavel de estado count
  }  


export default connect(mapStateToProps)(Main);      //conecatamos a função mapstateProps ao redux usado connect na classe Main 