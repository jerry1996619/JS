#include<Screen.h>
#define Solution_X 1920
#define Solution_Y 1080
#define mip "225.6.7.8"
#define mport 3334

void Screen::redraw()
{
	//frameNum++;
	this->update();
}


struct arg{
	Screen* mthis;
};
void ScreenCapturer(void* param){

		arg *marg = (arg*)param;

		while (1)
		{

			
			QScreen *screen = QGuiApplication::primaryScreen();
			//screen->grabWindow(0).save("123.jpg", "jpg");
			marg->mthis->sim = screen->grabWindow(0).toImage();
			//marg->mthis->sim2 = marg->mthis->sim;
			emit marg->mthis->grabb();
			//printf("%s", "captured\n");
			marg->mthis->frameNum++;

		}
}
void sendd(void* param)
{
	arg *marg = (arg*)param;
	while (1)
	{
		void* x = &(marg->mthis->sim);
		//cout << "xxxxxx:" ;
		marg->mthis->udp->sendto(x, sizeof((*(QImage*)x))); //sim2 16 x 4
	
		Sleep(3000); 
	}
}
void screen_recvv(void* param)
{
	arg *marg = (arg*)param;
	while (1)
	{
		char* temp = (char*)malloc(20000 * sizeof(char));

		marg->mthis->udp->recvfrom(temp, sizeof(QImage));
		marg->mthis->sim2 = *(QImage*)temp;
		cout << "2222:" << sizeof(marg->mthis->sim2);
	}
}
Screen::Screen(UDPSocket *firstudp)
{
	//this->setWindowFlags(Qt::FramelessWindowHint);
	udp = new UDPSocket(mip,mport); //傳入UDP指標        //可以用一樣的ip port
	cout << "errorscreenudp:"<<WSAGetLastError();

	x = 0; y = 0;
	frameNum = 0;
		timer = new QTimer(this);
		timer2 = new QTimer(this);

		marg.mthis = this;
		ql = new QLabel();

		//timer->start(0.001);
		QObject::connect(this, SIGNAL(grabb()), this, SLOT(redraw()));   //*******

		_beginthread(ScreenCapturer,0, &marg);
		

		QObject::connect(timer, SIGNAL(timeout()), this, SLOT(fps()));
		//QObject::connect(timer2, SIGNAL(timeout()), this, SLOT(redraw())); //*******

		timer->start(1000);
		timer2->start(50);
		_beginthread(sendd, 0, &marg);
		_beginthread(screen_recvv, 0, &marg);
		
}
void Screen::fps(){
	cout << "fps=";
	printf("%d", frameNum);
	cout << "\n";
	//cout << "sim:"<<sizeof(sim);   //圖片大小
	frameNum = 0;
}

void Screen::paintEvent(QPaintEvent *e)
{
		Q_UNUSED(e);
		QPainter painter(this);



		QRectF source(x, y, Solution_X, Solution_Y);

		QRectF target(0, 0, Solution_X, Solution_Y);
		// target(0, 0, this->width(), this->height());

		painter.drawImage(target,sim2,source);

}
	/*
	void Screen::timerEvent(QTimerEvent *)
	{
		update();
	}
	*/

/*grab window
void Screen::mousePressEvent(QMouseEvent *event)
{

		if (event->button() == Qt::LeftButton) {
			pos = event->globalPos() - frameGeometry().topLeft();
			event->accept();
		}
}

void Screen::mouseMoveEvent(QMouseEvent *event)
{
		if (event->buttons() & Qt::LeftButton) {
			move(event->globalPos() - pos);
			event->accept();
		}
}
/***/
void Screen::mousePressEvent(QMouseEvent *event)
{

	if (event->button() == Qt::LeftButton) {
		pos = event->globalPos() - frameGeometry().topLeft();
		event->accept();
	}
}

void Screen::mouseMoveEvent(QMouseEvent *event)
{
	if (event->buttons() & Qt::LeftButton) {
		int xx;
		int yy;
		xx = event->x();
		yy = event->y();

		if (xx > this->width())xx = this->width()+160;  //+640
		if (yy > this->height())yy = this->height()-60; //+120

		if (xx < 0)xx = 0;
		if (yy < 0)yy = 0;

		event->accept();
		x = xx;
		y = yy;

	}
}

