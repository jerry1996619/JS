#include<UDPSocket.h>
#include<qwidget.h>
#include<qpushbutton.h>
#include<qlineedit.h>
#include<qtextedit.h>
#include<qlayout.h>
#include<qinputdialog.h>
#include<qmessagebox.h>

#define qs QStringLiteral
#define mc_ip "225.6.7.8"
#define mc_port 3333
#define BUFSIZE 1024

class MyWindow:public QWidget{
	Q_OBJECT
	
public:
	MyWindow(char*,short);
	QPushButton *sendBtn;
	QLineEdit *line;
	QVBoxLayout *vlayout;
	QTextEdit *text;
	UDPSocket *udp;

	QString str;
	QString ID;

	struct arg
	{
		UDPSocket* mudp;
		MyWindow* mthis;
	};
	
	arg marg;
	char* mip;
	short mport;

public slots:
	void putt();
	void gettext();
signals:
	void gett();
	
};