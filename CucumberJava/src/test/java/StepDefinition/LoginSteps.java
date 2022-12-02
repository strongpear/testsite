package StepDefinition;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class LoginSteps {

	WebDriver driver = null;
	
	@SuppressWarnings("deprecation")
	@Given("browser is open")
	public void browser_is_open() {
		System.out.println("Inside Step - user is on the login page");
		String projectPath = System.getProperty("user.dir");
		System.out.println("Project path is: "+projectPath);
		System.setProperty("webdriver.chrome.driver", projectPath+"/src/test/resources/drivers/chromedriver.exe");
		
		driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
		driver.manage().timeouts().pageLoadTimeout(40, TimeUnit.SECONDS);
	}

	@And("user is on the Login page")
	public void user_is_on_the_Login_page() {
	
		driver.nagivate().to("https://ghostdynos.herokuapp.com/");
	}

	@When("user enters username and password")
	public void user_enters_username_and_password() {
		
		driver.findElement(By.id("Username")).sendKeys("bad");
		driver.findElement(By.id("Password")).sendKeys("bad");
	}

	@And("user clicks on the Login button")
	public void user_clicks_on_the_login_button() {
	
		driver.findElement(By.id("loginStatus")).click();
	}

	@Then("user is navigated to the user home page")
	public void user_is_navigated_to_the_user_home_page() {
		
		driver.findElement(By.id("logout")).isDisplayed();
		
		driver.close();
		driver.quit();
		
	}	
}
