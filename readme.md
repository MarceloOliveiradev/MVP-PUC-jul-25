# Heart Disease Classifier - MVP PUC-Rio

Este projeto é um MVP de uma aplicação inteligente capaz de prever a presença de doenças cardíacas com base em atributos clínicos. Ele contempla desde a criação e avaliação do modelo de machine learning até sua integração em uma aplicação full stack funcional, com boas práticas de teste e segurança.

## Estrutura

├── app/

│ ├── backend/

│ │ ├── main.py # API Flask que carrega e serve o modelo

│ │ ├── requirements.txt # Dependências do backend

│ ├── frontend/

│ │ ├── index.html # Interface web para entrada de dados

│ │ ├── style.css # Estilização e responsividade

│ │ └── script.js # Interatividade e chamada à API

│

├── model/

│ └── model_heart_classification.pkl # Modelo final treinado e calibrado

│

├── notebook/

│ └── heart_disease_classification.ipynb # Treinamento e exportação do modelo

│

├── test_model.py # Teste automatizado com PyTest

├── README.md # Este arquivo

## Sobre o Projeto

O sistema prevê se um paciente apresenta risco de doença cardíaca com base em atributos clínicos como idade, colesterol, pressão arterial, frequência cardíaca etc.

O projeto foi desenvolvido conforme os pilares da disciplina **Qualidade de Software, Segurança e Sistemas Inteligentes** da pós-graduação em Engenharia de Software da **PUC-Rio**.

## Requisitos

Antes de rodar o projeto, crie um ambiente virtual e instale as dependências:

```bash
python -m venv venv
venv\Scripts\activate      # No Windows
source venv/bin/activate  # No Linux/Mac

cd app
pip install -r backend/requirements.txt # Estando dentro da pasta app/
```

## Como executar

### 1. Backend

```bash
cd backend
python main.py
```

A API será iniciada em http://localhost:5000/.

Rotas disponíveis:

- GET / – Verifica se a API está funcionando.

- POST /predict – Recebe os dados clínicos no corpo JSON e retorna a predição e a probabilidade.

### 2. Frontend

Abra o arquivo app/frontend/index.html no navegador (clique duplo).

Preencha os dados clínicos no formulário e clique em "Enviar".
Você verá a predição e a probabilidade do resultado na tela.

## Teste 1 – Perfil de alto risco (esperado: resultado ruim)

"age": 42,
"sex": 0,
"cp": 2,
"trestbps": 120,
"chol": 190,
"fbs": 0,
"restecg": 1,
"thalach": 172,
"exang": 0,
"oldpeak": 0.1,
"slope": 2,
"ca": 0,
"thal": 2

## Teste 2 – Perfil de baixo risco (esperado: resultado bom)

"age": 67,
"sex": 1,
"cp": 3,
"trestbps": 160,
"chol": 290,
"fbs": 1,
"restecg": 0,
"thalach": 108,
"exang": 1,
"oldpeak": 3.5,
"slope": 0,
"ca": 2,
"thal": 3

### 3. Teste Automatizado

Com a API desligada, execute os testes com pytest:

```bash
cd backend # Estando dentro da pasta app/
pytest test_model.py
```

O teste verifica se:

- O modelo consegue gerar predições (0 ou 1);

- A probabilidade está entre 0 e 1.

## Notebook de Machine Learning

O processo de construção do modelo está documentado no Colab:

notebook/heart_disease_classification.ipynb

Inclui:

- Carga dos dados via URL (sem necessidade de upload)

- Análise exploratória

- Visualizações com seaborn/matplotlib

- Treinamento com KNN, Decision Tree, Naive Bayes e SVM

- Otimização com GridSearchCV

- Calibração com CalibratedClassifierCV

- Avaliação com métricas

- Exportação do modelo final (model_heart_classification.pkl)

## Boas práticas de segurança

Embora o dataset seja anonimizado e público, o projeto reflete boas práticas vistas na disciplina de Desenvolvimento de Software Seguro:

- Não há armazenamento de dados do usuário;

- Nenhuma informação sensível é salva no frontend ou backend;

- Em um cenário real, recomenda-se:

* Uso de HTTPS;

* Autenticação para uso da API;

* Pseudonimização e criptografia de dados clínicos;

* Limitação de acesso por perfis.

## Tecnologias utilizadas

- Python + Flask + joblib

- Scikit-learn (SVM + CalibratedClassifierCV)

- HTML, CSS e JavaScript

- Pytest para testes automatizados

## Observações

- O modelo foi treinado com SVM e calibrado com validação cruzada (sigmoid) para fornecer probabilidades mais realistas.

- Pode haver leve variação de comportamento do modelo se houver diferença de versão entre scikit-learn do treinamento (ex: 1.6.1) e do ambiente atual (meu ambiente: 1.7.0).

## Conclusão

O projeto demonstra como aplicar machine learning para resolver um problema real de saúde, integrando-o de forma prática com uma aplicação web interativa e segura. Atende a todos os requisitos do MVP da disciplina, com destaque para:

- Integração full stack funcional;

- Teste automatizado;

- Código organizado e limpo;

- Explicações claras no notebook;

- Reflexão sobre segurança de dados.

Aluno: Marcelo Oliveira

Curso: Pós-Graduação em Engenharia de Software – PUC-Rio

Disciplina: Qualidade de Software, Segurança e Sistemas Inteligentes
