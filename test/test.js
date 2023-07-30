import { launch } from "puppeteer";

(async () => {
  // Initiate the browser
  const browser = await launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // Go to the target website
  await page.goto("http://127.0.0.1:5173/");
  await new Promise((r) => setTimeout(r, 1000));

  //Delete all first
  const deleteAll = await page.$(
    "#root > div > div:nth-child(1) > div.col > button"
  );
  await deleteAll.press("Enter");
  await new Promise((r) => setTimeout(r, 2000));
  const deleteAllConfirm = await page.$(
    "body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-danger"
  );
  await deleteAllConfirm.press("Enter");
  await new Promise((r) => setTimeout(r, 2000));

  //Add multiple tasks
  async function add(text) {
    const name = await page.$(
      "#root > div > div.my-5.row > div:nth-child(1) > div > input"
    );
    await name.type(text);
    await new Promise((r) => setTimeout(r, 2000));
    const button = await page.$(
      "#root > div > div.my-5.row > div:nth-child(1) > div > button"
    );
    await button.press("Enter");
    await name.click({ clickCount: 3 });
    await name.press("Backspace");
  }
  await add("Task 1 bot");
  await add("Task 2 bot");
  await add("Task 4 bot");
  await new Promise((r) => setTimeout(r, 2000));

  //Edit the first task and change the text to "Task 3 bot"
  const editButton =
    "#root > div > div:nth-child(3) > div:nth-child(1) > div.mb-3.row > div:nth-child(2) > button.m-1.btn.btn-secondary";
  await page.waitForSelector(editButton);
  await page.click(editButton);
  await new Promise((r) => setTimeout(r, 2000));
  const nameEdit = await page.$(
    "#root > div > div.my-5.row > div:nth-child(1) > div > input"
  );
  await nameEdit.click({ clickCount: 3 });
  await nameEdit.press("Backspace");
  await nameEdit.type("Task 3 bot");
  await new Promise((r) => setTimeout(r, 2000));
  const editConfirm = await page.$(
    "#root > div > div.my-5.row > div:nth-child(1) > div > button"
  );
  await editConfirm.press("Enter");
  await new Promise((r) => setTimeout(r, 2000));

  // Mark the status of the first task to done
  const markDone =
    "#root > div > div:nth-child(3) > div:nth-child(1) > div.mb-3.row > div:nth-child(1) > input";
  await page.waitForSelector(markDone);
  await page.click(markDone);
  await new Promise((r) => setTimeout(r, 2000));

  // Mark the status of the first done task to undone
  const markUnDone =
    "#root > div > div:nth-child(3) > div:nth-child(2) > div.mb-3.row > div:nth-child(1) > input";
  await page.waitForSelector(markUnDone);
  await page.click(markUnDone);
  await new Promise((r) => setTimeout(r, 2000));

  //Search
  const search = await page.$(
    "#root > div > div.my-5.row > div:nth-child(3) > div > input"
  );
  await search.type("4");
  await new Promise((r) => setTimeout(r, 5000));

  // Closes the browser and all of its pages
  await browser.close();
})();
