var assert = require('assert')
const webdriver = require('selenium-webdriver');
const URL = "http://svelte3-todo.surge.sh/"
// const URL = "http://localhost:5000"

describe('Svelte Todo App Test', function() {
  var driver;

  before(function() {
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  });

  it('add a task', function() {
    driver.get(URL);
    driver.findElement(webdriver.By.className('js-todo-input')).sendKeys('Build App\n').then(()=>{
      driver.getPageSource().then(source=>{
        assert.equal(source.includes("Build App"), true)
      })
    });
  })

  it('mark a task complete', function() {
    driver.get(URL);
    driver.findElement(webdriver.By.className('js-todo-input')).sendKeys('Build App\n');
    driver.findElement(webdriver.By.className("tick")).click()
    driver.findElement(webdriver.By.className("todo-item")).getAttribute("class").then(function(className){
      assert.equal(className.includes("done"), true)
    });
  });

  it('delete a task', function() {
    driver.get(URL);
    driver.findElement(webdriver.By.className('js-todo-input')).sendKeys('Build App\n');
    driver.findElement(webdriver.By.className("delete-todo")).click();
    driver.getPageSource().then(source=>{
      assert.equal(source.includes("Build App"), false)
    });
  });
  
  after(function() { driver.quit(); });
});
