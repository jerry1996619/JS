/********************************************************************************
** Form generated from reading UI file 'Qt.ui'
**
** Created by: Qt User Interface Compiler version 5.8.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_QT_H
#define UI_QT_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_QtClass
{
public:
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QWidget *centralWidget;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *QtClass)
    {
        if (QtClass->objectName().isEmpty())
            QtClass->setObjectName(QStringLiteral("QtClass"));
        QtClass->resize(600, 400);
        menuBar = new QMenuBar(QtClass);
        menuBar->setObjectName(QStringLiteral("menuBar"));
        QtClass->setMenuBar(menuBar);
        mainToolBar = new QToolBar(QtClass);
        mainToolBar->setObjectName(QStringLiteral("mainToolBar"));
        QtClass->addToolBar(mainToolBar);
        centralWidget = new QWidget(QtClass);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        QtClass->setCentralWidget(centralWidget);
        statusBar = new QStatusBar(QtClass);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        QtClass->setStatusBar(statusBar);

        retranslateUi(QtClass);

        QMetaObject::connectSlotsByName(QtClass);
    } // setupUi

    void retranslateUi(QMainWindow *QtClass)
    {
        QtClass->setWindowTitle(QApplication::translate("QtClass", "Qt", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class QtClass: public Ui_QtClass {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_QT_H
