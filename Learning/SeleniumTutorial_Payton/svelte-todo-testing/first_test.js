const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://svelte3-todo.surge.sh/').then(function() {
// Add an task
driver.findElement(webdriver.By.className('js-todo-input')).sendKeys('Build App\n').then(function() {
    console.log("Adding A Task: ")
driver.getPageSource().then(source => {
        if (source.includes("Build App")) {
            console.log("Test Passed!")
        } else {
            console.log("Test Failed!")
        }
    })
// Check off the task
driver.findElement(webdriver.By.className("tick")).click().then(function() {
        console.log("Marking Task Complete: ")
        driver.findElement(webdriver.By.className("todo-item")).getAttribute("class").then(function(className) {
            if (className.includes("done")) {
                console.log("Test Passed!")
            } else {
                console.log("Test Failed!")
            }
	driver.findElement(webdriver.By.className("delete-todo")).click().then(function(){
                console.log("Deleting A Task: ");
                driver.getPageSource().then(source => {
                    if (source.includes("Build App")) {
                        console.log("Test Failed!");
                    } else {
                        console.log("Test Passed!");
                    };
                });
            });
        })
     });

  });
});
