


#include<stdlib.h>
#include<stdio.h>
#include<thread>
#include <process.h>
#include<iostream>

#include <QtWidgets/QApplication>
#include<qabstractvideosurface.h>
#include<qvideosurfaceformat.h>
#include<qvideowidget.h>
#include<qfileinfo.h>
#include<qtextcodec.h>

#include"MyWindow.h"
#include"Screen.h"
#include<Windows.h>
using namespace std;
#include<pgsql\include\libpq-fe.h>


#pragma warning(disable:4996)



QString BKE_CURRENT_DIR;
QImage sim;


/*Class*******************************/
class MyVideoSurface : public QAbstractVideoSurface
{
public:
	QList<QVideoFrame::PixelFormat> supportedPixelFormats(
		QAbstractVideoBuffer::HandleType handleType = QAbstractVideoBuffer::NoHandle) const
	{
		Q_UNUSED(handleType);

		return QList<QVideoFrame::PixelFormat>() << QVideoFrame::Format_RGB32;
	}

	bool present(const QVideoFrame &frame)
	{
		Q_UNUSED(frame);

		return true;
	}
};


/*Threads*****************************/
void SqlConnecter(void* param){
	const char *conninfo;
	PGconn *conn;
	PGresult *res;
	int nFields;
	int i, j;
	conninfo = "hostaddr=127.0.0.1 port=5432 dbname=postgres user=postgres password=root";
	conn = PQconnectdb(conninfo);
	if (PQstatus(conn) != CONNECTION_OK)
	{
		cout << "sql err";
		PQfinish(conn);
		//exit(1);
	}
	if (PQstatus(conn) == CONNECTION_OK)
		while (1){
		cout << "OK";
		Sleep(10);
		}
	
}

void setpix(void* param)
{
	struct arg{
		Screen* mthis;
	};
	arg *marg = (arg*)param;
	
	while (1)
	{printf("set");

		Sleep(10);
		//marg->mthis->ql->setPixmap(QPixmap::fromImage(sim)); 垃圾
	
	}
}
/*Functions*************************/
void str2xml(char* xml,char* tableName, char* col[],char* data[], int n)
{//col=欄位 data=欄位資料 n=欄位數
	
	sprintf(xml,"<%s ",tableName);
	for (int i = 0; i < n; i++)
	{
		sprintf(xml+strlen(xml),"<%s>\"%s\"</%s>\n",col[i],data[i],col[i]);
	}
	sprintf(xml+strlen(xml),"</%s>\n",tableName);
	
	//return xml;
}
void ex_xml()
{
	char *xml = (char*)malloc(1000 * sizeof(char));

	char* table = "jerry";
	char* col[2] = { "gender", "bd" };
	char* data[2] = { "male", "619" };
	str2xml(xml, table, col, data, 2);
	printf("%s", xml);
	free(xml);
}

/*Main********************************/
int main(int argc,char* argv[])
{
	/*bug:can't fine plugin windows*/
	QTextCodec *xcodec = QTextCodec::codecForLocale();
	QString exeDir = xcodec->toUnicode(QByteArray(argv[0]));
	BKE_CURRENT_DIR = QFileInfo(exeDir).path();
	//qt has a bug in 5.2.1(windows)? so I use setLibraryPaths
	QApplication::setLibraryPaths(QApplication::libraryPaths() << BKE_CURRENT_DIR);
	/******************************/


	QApplication a(argc,argv);

	_beginthread(SqlConnecter, 0, nullptr);
	
	//callex();
	MyWindow w("225.6.7.8",3333);
	w.show();

	Screen s(w.marg.mudp);
	s.show();
	
	

	
	//ex_xml();

	//system("cd /d C:\\Users\\jerry\\Desktop");
	//system("java app");

	
	return a.exec();
}
