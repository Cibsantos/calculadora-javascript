class CalcController {
    constructor(){
        // 3 tipos de proteção public, private, protect o "_" torna privado
         //document.querySelector = document.getElementByID
         this._operation = [];
         this._locale = "pt-BR";
         this._displayCalcEl = document.querySelector('#display');
         this._dateEl = document.querySelector('#data');
         this._timeEl = document.querySelector('#hora');
         this._currentDate;
         this.initialize();
         this.initButtonsEvents();

    }

    initialize(){
      
        this.setDisplayDateTime();

      setInterval(()=>{
        
        this.setDisplayDateTime();


      }, 1000);  


      this.setLastNumberToDisplay();
    }
    
    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);
        });

    }

    clearAll(){
        this._operation = [];

        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();

        
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(valor){
        this._operation[this._operation.length -1] = valor;
    }

    isOperator(valor){

       return (['+','-','*','/','%'].indexOf(valor) > -1);
       
    }

    pushOperation(valor){

        this._operation.push(valor);
        
        if (this._operation.length > 3){
        
                                
           this.calc();

        }
    }

    getResult(){

        return eval(this._operation.join(""));
    }

    calc(){

        let last = "";

        if (this._operation.length >3){
           
            let last = this._operation.pop();

            let result = this.getResult();
    
            
        }   
        
       
        
        let result = this.getResult();

        if (last == "%"){

            result /= 100;

            this._operation = [result];
            
        }else{

        this._operation = [result];
        if (last) this._operation.push(last);
        
        }

        this.setLastNumberToDisplay();      
    }   

    setLastNumberToDisplay(){

        let lastNumber; 

        for (let i = this._operation.length - 1; i >= 0; i--){
            
            if (!this.isOperator(this._operation[i])){
                
                lastNumber = this._operation[i];
                break;
            }
        }

        if (!lastNumber) lastNumber = 0;
        
        this.displayCalc = lastNumber;
    }

    addOperation(valor){

               
        if (isNaN(this.getLastOperation())){
            
            if (this.isOperator(valor)){
               
                this.setLastOperation(valor);


            }else if(isNaN(valor)){
                console.log("Outra coisa", valor);
           
            }else{
                this.pushOperation(valor);
                
                this.setLastNumberToDisplay();
               
            }

        }else{
            if (this.isOperator(valor)){
                
                this.pushOperation(valor);
                    
            }else{
                
                let novoValor =  this.getLastOperation().toString() + valor.toString();
                
                this.setLastOperation(parseInt(novoValor));
                
                this.setLastNumberToDisplay();
               
          
                }
        }
    }


    setError(){
        this.displayCalc = "Error";
    }

    execBtn(valor){
        
        switch (valor) {
            
            case 'ac':
                
                this.clearAll();
                break;
        

            case 'ce':
                
                this.clearEntry();
                break;

            case 'soma':
                
                this.addOperation('+');
                break;

            case 'subtracao':
               
                this.addOperation('-');
                break;

            case 'multiplicacao':
                
                this.addOperation('*');
                break;

            case 'divisao':
               
                this.addOperation('/');
                break;

            case 'porcento':
               
                this.addOperation('%');
                break;

            case 'igual':

                this.calc();
               break;
          
            case 'ponto':
                this.addOperation('.')
                break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(valor));
                break;

            default:
                this.setError();
                break;

        }


    }


    initButtonsEvents(){

       let buttons = document.querySelectorAll("#buttons > g, #parts > g");

       buttons.forEach((btn, index) => {
           
            this.addEventListenerAll(btn, "click drag", e => {
                
                let textBtn = btn.className.baseVal.replace("btn-","");
                this.execBtn(textBtn);
           
            });
       
           this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
               btn.style.cursor = "pointer"
           });
        });
       
    } 

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

  

    get displayTime(){
        return this._timeEl.innerHTML; 

    } 

    set displayTime(valor){
        return this._timeEl.innerHTML = valor;   
    }

    get displayDate(){
        return this._dateEl.innerHTML;

    }

    set displayDate(valor){
        return this._dateEl.innerHTML = valor;
    }

    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor; 
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(valor){
        this._currentDate = valor; 
    }
}
