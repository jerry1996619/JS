#using <mscorlib.dll>
#using <system.dll>
#using<System.Windows.Forms.dll>
#include<stdlib.h>

void callex()
{

	//System::String *target = "C:\\Users\\jerry\\Desktop\\tex.exe";


	System::Diagnostics::Process::Start("C:\\Users\\jerry\\Desktop\\tex.exe");//java class­n©ñ.cpp¥Ø¿ý


}
int main()
{
	
	callex();
	system("pause");
}