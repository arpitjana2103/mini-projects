// Hash-Map ( Object )
// const obj = new Object();
const obj = {};

// Insert a value
// obj.a = 1;
obj["a"] = 1;

// Access a value
obj.a;
obj["a"];

// Increment / Decrement
obj.a = obj.a + 1;
obj.a++;

obj["a"] = obj["a"] + 1;
obj["a"]++;

// check availability

// obj["c"] === undefined  => true, [Not Present]
// obj["c"] === undefined  => false, [Present]

obj = {
  fucn: function () {
    console.log(this);
  },
};
