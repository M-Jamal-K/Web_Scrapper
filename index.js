const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening at port ${port}`));
app.use(express.static("public"));
app.use(express.json());
const x = 0;
console.log(x);
app.post("/api", (req, res) => {
  // console.log(req.body.Value);
  let search = req.body.Value;
  console.log(`In backend  ${search}`);
  (async () => {
    try {
      // const browser = await puppeteer.launch({ headless: false });
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
      });
      const page = await browser.newPage();
      await page.setDefaultTimeout(60000);
      await page.goto("https://www.google.com/");
      await page.type("[aria-label='Search']", search, { delay: 100 });
      await page.evaluate(() => {
        document.querySelector(".aajZCb").style.display = "none";
        document.querySelector(".gNO89b").click();
      });
      await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 0 });
      console.log("Reached to the page");
      await page.waitForFunction(() => {
        let dropDownbtn = document.querySelectorAll(".wwB5gf");
        if (dropDownbtn.length) {
          dropDownbtn.forEach((a) => {
            a.click();
          });
          // test@2
          let dropDownbtn2 = document.querySelectorAll(".wwB5gf");
          dropDownbtn2.forEach((a) => {
            a.click();
          });
          let dropDownbtn_3 = document.querySelectorAll(".wwB5gf");
          dropDownbtn_3.forEach((a) => {
            a.click();
          });

          dropDownbtn_3.forEach((a) => {
            a.click();
          });
          //test@2
          window.scrollTo(0, 2800);
        } else {
          return true;
        }

        if (document.documentElement.scrollHeight > 4600) {
          window.scrollTo(0, 5000);
          return true;
        }
      }, {});

      console.log("First test pass");

      await page.evaluate(async () => {
        await new Promise(function (resolve) {
          setTimeout(resolve, 500);
        });
      });

      await page.waitForFunction(() => {
        let dropDownbtn = document.querySelectorAll(".wwB5gf");
        if (dropDownbtn.length) {
          document.querySelector(".wwB5gf").click();
          document.querySelector(".wwB5gf").click();
          dropDownbtn.forEach((a) => {
            a.click();
          });
          // test@2
          dropDownbtn.forEach((a) => {
            a.click();
          });
          let dropDownbtn_2 = document.querySelectorAll(".wwB5gf");
          dropDownbtn_2.forEach((a) => {
            a.click();
          });
          dropDownbtn_2.forEach((a) => {
            a.click();
          });
          //test@2
          window.scrollTo(0, 4700);
        } else {
          return true;
        }
        if (document.documentElement.scrollHeight > 4900) {
          return true;
        }
      }, {});
      console.log("Second test pass");
      await page.evaluate(async () => {
        window.scrollTo(0, 3500);
        await new Promise(function (resolve) {
          setTimeout(resolve, 1000);
        });
      });
      console.log("Waiting finished");

      const grabData = await page.evaluate(async () => {
        const data = [];

        let Main_Des_First = document.querySelector(".kno-rdesc span");
        let Main_Des_Second = document.querySelector(".V3FYCf .hgKElc");
        let search_Q = document.querySelector("[aria-label='Search']");
        let Snippt = document.querySelector(".kJ442 .hgKElc");

        if (Main_Des_First != null) {
          data.push({
            Question: search_Q.value,
            Answer: Main_Des_First.textContent
          });
        } else if (Main_Des_Second != null) {
          data.push({
            Question: search_Q.value,
            Answer: Main_Des_Second.textContent
          });
        } else if (Snippt != null) {
          data.push({
            Question: search_Q.value,
            Answer: Snippt.textContent
          });
        }

        let Answers = document.querySelectorAll(".hgKElc");
        if (Answers.length) {
          for (let i = 0; i < Answers.length; i++) {
            let cond =
              Answers[i].parentElement.parentElement.parentElement.parentElement
                .parentElement.parentElement.parentElement
                .previousElementSibling;
            if (cond == null) {
              continue;
            }
            let Question =
              Answers[i].parentElement.parentElement.parentElement.parentElement
                .parentElement.parentElement.parentElement
                .previousElementSibling.textContent;
            data.push({
              Question: Question,
              Answer: Answers[i].textContent
            });
          }
        } else {
          data.push({
            Question: "No Question on Google first page",
            Answer: "No Answer on Google first page",
            id: null
          });
        }
        return data;
      });
      if (grabData.length) {
        console.log(grabData);
        res.json({
          status: "SUCCESS",
          QnA: grabData
        });
      }
      await browser.close();
    } catch (error) {
      res.json({
        status: "FAILED",
        errorMessage: error.message
      });
    }
  })();
});
