import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
  headers: {
    'x-rapidapi-key': '72f8607dd9mshd05b95303be9778p1d223cjsn07a968dca1c4',
    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    language: 'cpp', // Set the language to C++
    stdin: 'Peter',
    files: [
      {
        name: 'main.cpp', // C++ source file name
        content: `#include <iostream>
#include <string>

int main() {
    std::string name;
    std::getline(std::cin, name);
    std::cout << "Hello " << name << std::endl;
    return 0;
}`
      }
    ]
  }
};

(async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})();
