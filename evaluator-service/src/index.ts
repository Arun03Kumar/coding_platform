import express from "express";
import bodyparser from "body-parser";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import redis from "./config/redisConfig.js";
import sampleQueueProducer from "./producers/sampleQueueProducer.js";
import sampleWorker from "./workers/sampleWorker.js";
import { runPython } from "./containers/pythonExecutor.js";
import { runJava } from "./containers/javaExecutor.js";
import { runCpp } from "./containers/cppExecutor.js";
import submissionWorker from "./workers/submissionWorkers.js";
import submissionQueueProducer from "./producers/submissionQueueProducer.js";

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(bodyparser.text());

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log("server is running on port:", PORT);

  //   sampleQueueProducer("SampleJob", {
  //     name: "Hello",
  //     comp: "asdfj",
  //   });

  //   sampleWorker("SampleQueue");

  //   const code = `x = input()
  // y = input()
  // print("val x", x)
  // print("val y",y)`;

  //   const testCase = `100
  // 200`;
  //   runPython(code, testCase);

  // const code = `
  //   import java.util.*;
  //   public class Main {
  //     public static void main(String[] args) {
  //       Scanner scn = new Scanner(System.in);
  //       int input = scn.nextInt();
  //       System.out.println("input val" + input);
  //       for(int i = 0; i < input; i++) {
  //       System.out.println(i);}
  //     }
  //   }
  // `;

  // const testCase = `10`;
  // runJava(code, testCase);

  const code = `
    #include<iostream>
    using namespace std;

    int main() {
      int x;
      cin >> x;
      for(int i = 0; i < x; i++) cout << i << endl;

      return 0;
    }
  `;

  const testCase = `10`;
  // runCpp(code, testCase);

  submissionWorker("SubmissionQueue");
  submissionQueueProducer("SubmissionJob", {
    "123": {
      language: "CPP",
      code,
      inputCase: testCase,
    },
  });
});
