
                    function sum(){
                        let n1, res;
                        n1=Number(document.getElementById("t1").value);
                        
                        if(n1 == 0 || n1 == ""){
                            alert("Value cant be null !");
                            return false;
                        }
                        if(n1 < 0){
                            alert("Incorret value !");
                            return false;
                        }
                        if(isNaN(n1)){
                            alert("Enter only numbers !");
                            return false;
                        }

                                            
                        res=n1*20;
                        document.getElementById("ttl").value = res;
                        
                        
                    }
                