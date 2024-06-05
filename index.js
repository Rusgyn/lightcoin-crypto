//let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let trx of this.transactions) {
      balance +=  trx.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()) {
      console.log("Insufficient funds. Your transaction cannot be completed.")
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0)
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("M&M Enterprise");

console.log('Starting balance: ', myAccount.balance);
const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Your current balance is: ', myAccount.balance);
console.log("=> End of Transaction");

console.log('Starting balance: ', myAccount.balance);
const t2 = new Deposit(120.00, myAccount);
t2.commit();
console.log('Your current balance is: ', myAccount.balance);
console.log("=> End of Transaction");
