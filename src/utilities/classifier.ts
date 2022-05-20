interface Classifier {
  classifer: Function,
  category: string,
}

const classifiers: Classifier[] = [
  {
    classifer: (e: any) => (e[2] as string).match(/(zomato|swiggy|licious|bigbasket|ratnadeep)/i),
    category: "Food",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/(spotify|netflix)/i),
    category: "Entertainment",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/(friends|family)/i),
    category: "Friends",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/(rent)/i),
    category: "Rent",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^EBA\/MF/),
    category: "Mutual Fund",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^EBA\/SIP/),
    category: "SIP",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^EBA\//),
    category: "Securities",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^To RD Ac no/),
    category: "Deposit",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/CASH WDL/),
    category: "Cash Withdrawl",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^UPI/),
    category: "UPI Payment",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^ACH\/.*?AMAZONDEV/),
    category: "Salary",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^BIL/),
    category: "Bills",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^VSI/),
    category: "Standing Instructions",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^ATD\//),
    category: "Auto Debit",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^VIN\/.*?GOOGLE/),
    category: "Google Pay",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/Int\.Pd/),
    category: "Interest",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/(^IIN\/|^VIN\/.*?AMAZON)/),
    category: "Amazon Pay",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^VIN\/ADOBE/),
    category: "Adobe",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^VIN\/PAYPAL/),
    category: "PayPal",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^VIN\/NAME-CHEAP/),
    category: "Namecheap",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^VIN\/.*/),
    category: "Shopping",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^ACH\/.*?ICICIPRU/),
    category: "Insurance",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/^GIB/),
    category: "Tax",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/PPF/),
    category: "PPF",
  },
  {
    classifer: (e: any) => (e[2] as string).match(/.*/),
    category: "Unclassified",
  },
];

export const classifyTransaction = (txn: any) => {
  return classifiers.map(classifier => classifier.classifer(txn) ? classifier.category : '').filter(e => e)[0];
}