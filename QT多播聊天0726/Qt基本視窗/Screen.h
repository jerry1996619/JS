#include<qwidget.h>
#include<qtimer.h>
#include<qpainter.h>
#include<qscreen.h>
#include<QMouseEvent>
#include<qlabel.h>
#include<qguiapplication.h>
#include<qlayout.h>
#include<process.h>
#include<iostream>
#include<UDPSocket.h>
using namespace std;

class Screen :public QWidget
{
Q_OBJECT
public:
	Screen(UDPSocket *);
	void paintEvent(QPaintEvent *);
	//void timerEvent(QTimerEvent *);
	void mouseMoveEvent(QMouseEvent *);
	void mousePressEvent(QMouseEvent *);

	UDPSocket *udp;

	QLabel *ql;
	QVBoxLayout *vlay;

	QTimer *timer;
	QTimer *timer2;
	int frameNum;

	QPoint pos;
	int x;
	int y;

	struct arg
	{
		Screen* mthis;
	}marg;
	QImage sim;
	QImage sim2;
	QScreen *screen;
signals:
	void grabb();

	public slots:
	void redraw();
	void fps();
};