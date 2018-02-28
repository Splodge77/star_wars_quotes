const QuoteView = require('./views/quoteView');
const Request = require('./services/request.js');

const quoteView = new QuoteView();
const request = new Request('http://localhost:3000/api/quotes');

const appStart = function(){
  request.get(getQuotesRequestComplete);

  const createQuoteButton = document.querySelector('#submit-quote');
  createQuoteButton.addEventListener('click', createButtonClicked);

  const createDeleteButton = document.querySelector('#deleteButton');
  createDeleteButton.addEventListener('click', deleteButtonClicked);
};

const getQuotesRequestComplete = function(allQuotes){
  console.log(allQuotes);
  allQuotes.forEach(function(quote) {
    quoteView.addQuote(quote);
  });
};

const createButtonClicked = function(event) {
  event.preventDefault();
  console.log('form submit clicked');

  const nameInputValue = document.querySelector('#name').value;
  const quoteInputValue = document.querySelector('#quote').value;

  const quoteToSend = {
    name: nameInputValue,
    quote: quoteInputValue
  };
  request.post(createRequestComplete, quoteToSend);
}

const createRequestComplete = function(newQuote) {
  quoteView.addQuote(newQuote);
};

const deleteButtonClicked = function(event) {
  console.log('delete button clicked');
  request.delete(deleteRequestComplete)
};

const deleteRequestComplete = function(){
  quoteView.clear();
}



document.addEventListener('DOMContentLoaded', appStart);
