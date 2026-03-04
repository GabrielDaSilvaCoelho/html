import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

const supabaseUrl = "https://dmfnfiklehsgtrlcmyhl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtZm5maWtsZWhzZ3RybGNteWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDE5MjksImV4cCI6MjA4NjIxNzkyOX0.60pjZ6FvJXf40J5_hyNbAJ9W8wOot4JWL97353-6ZRI"
const supabase = createClient(supabaseUrl, supabaseKey)

async function cadastrar(){
const nome = document.getElementById("nome").value
const cpf = document.getElementById("cpf").value
const telefone = document.getElementById("telefone").value
const email = document.getElementById("email").value
const senha = document.getElementById("senha").value

const saltRounds = 6;
  const senhaHash = await bcrypt.hash(senha, saltRounds);

const { error } = await supabase
.from("usuario")
.insert([{
nome,
cpf,
telefone,
email,
senha_hash: senhaHash
}])

if(error){
document.getElementById("msg").innerText = error.message
}else{
document.getElementById("msg").innerText = "Cadastro realizado!"
}

}

async function login(){

const email = document.getElementById("emailLogin").value
const senha = document.getElementById("senhaLogin").value

const { data,error } = await supabase
.from("usuario")
.select("*")
.eq("email",email)
.eq("senha_hash",senha)
.single()

if(error){
document.getElementById("msg").innerText = "Login inválido"
}else{
document.getElementById("msg").innerText = "Login realizado!"
}

}

window.cadastrar = cadastrar
window.login = login