import java.io.*;
import java.awt.*;
import javax.swing.*;
import org.jsoup.Jsoup;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.interactions.Actions;
class app
{
	public static void main(String args[]) throws IOException
	{
		chrome();
	}	
	public static void chrome()
	{
		WebDriver driver=null;
		System.setProperty("chrome",
			"D:\\chromedriver.exe");
		driver=new ChromeDriver(DesiredCapabilities.chrome());

		//login
		driver.get("https://bittrex.com/Account/Login");
		WebElement e = driver.findElement(By.id("UserName"));
		e.sendKeys("jerry1996619@gmail.com");
		e = driver.findElement(By.id("Password"));
		e.sendKeys("X1996619x");	
		driver.findElement(By.xpath("//*[@class='g-recaptcha btn btn-primary login']")).click();
		
		//open wallet

		driver.get("https://bittrex.com/Balance");
		driver.get("https://bittrex.com/Market/Index?MarketName=BTC-MUSIC");
		

		//driver.findElement(By.xpath("//span[@data-bind='text: summary.displayLast()']")).click();
		e=driver.findElement(By.xpath("//input[@name='total_Sell']"));
		e.clear();
		e.sendKeys("0.0005");
		
		e=driver.findElement(By.xpath("//*[@data-toggle='dropdown']"));
		e.click();
		e=driver.findElement(By.xpath("//*[@data-bind='click: trade.sellLastPrice']"));
		e.click();
	//new Actions(driver).moveToElement(e).perform();

		
	}	
}