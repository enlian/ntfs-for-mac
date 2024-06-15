# NTFS Mounter 
# Author: Kevin Stark
# Date: 2024/06/15
# Version: 1.1
# Github Address: https://github.com/ksDreamer/ntfs-mounter
# This project is a folk of https://github.com/enlian/ntfs-for-mac. A GUI (made by PyQt5) is added for better Human-Computer Interaction.
# Just like the original project, you must have `homebrew, macfuse, ntfs-3g-mac` installed. See README.md for details.
# For Python Environment, you must have PyQt5 installed. Get it by "pip install PyQt5"
# Developing Log:
'''
V1.1: 
删除没有使用到的import re语句。
优化各种文本内容。
增加在终端也返回操作结果。
学习了Pyinstaller不同打包方式的区别，选择单目录打包。
修改listDisks的输出变量名，从output改为listDisksOutput。
TD：想增加国际化多语言适配，下拉菜单选择多语言功能。lupdate？Qtranslator？还没定。
'''

import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QPushButton, QLineEdit, QLabel, QWidget, QMessageBox
from PyQt5.QtCore import QProcess, pyqtSlot
import subprocess

class NTFSMounter(QMainWindow):
    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        self.setWindowTitle('NTFS Mounter')
        self.setGeometry(100, 100, 500, 400) # 分别是窗口左上角的x坐标，y坐标，窗口宽度，高度

        layout = QVBoxLayout()

        self.disk_identifier_input = QLineEdit()
        self.disk_identifier_input.setPlaceholderText('在这里输入想要挂载的磁盘标识符(IDENTIFIER)')
        layout.addWidget(self.disk_identifier_input)

        self.refresh_button = QPushButton('刷新磁盘列表')
        self.refresh_button.clicked.connect(self.listDisks)
        layout.addWidget(self.refresh_button)

        self.mount_button = QPushButton('挂载NTFS磁盘')
        self.mount_button.clicked.connect(self.mountNTFSDisk)
        layout.addWidget(self.mount_button)

        self.status_label = QLabel('')
        layout.addWidget(self.status_label)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

        self.listDisks()

    @pyqtSlot()
    def listDisks(self):
        # 清空列表
        self.disk_identifier_input.clear()

        # 使用 diskutil 命令获取磁盘列表
        listDisksOutput = subprocess.check_output(['diskutil', 'list']).decode('utf-8')

        # 将输出添加到列表中
        self.status_label.setText('通过在终端输入 diskutil list 获取到的磁盘列表如下:\n' + listDisksOutput)

    @pyqtSlot()
    def mountNTFSDisk(self):
        # 获取用户输入的磁盘标识符
        disk_identifier = self.disk_identifier_input.text()

        # 验证磁盘标识符是否为空
        if not disk_identifier:
            self.status_label.setText('您没有输入磁盘标识符，请重新输入。')
            return
        
        reply = QMessageBox.question(self, '确认', f'确定要挂载磁盘 {disk_identifier} 吗?\n'+'请检查磁盘标识符是否输入准确\n可能需要在终端输入计算机密码', QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        # 尝试挂载磁盘
        if reply == QMessageBox.Yes:
            try:
                # 方案一：确认挂载后需要在终端输入计算机密码。
                subprocess.run(['sudo', 'umount', '/dev/'+disk_identifier], check=True)
                subprocess.run(['sudo', '/System/Volumes/Data/opt/homebrew/bin/ntfs-3g', '/dev/'+disk_identifier, '/Volumes/NTFS', '-olocal', '-oallow_other', '-o', 'auto_xattr'], check=True)
                
                # # 方案二：用QProcess，和方案一效果没区别，可能是我没利用好QProcess？想要实现的效果是能在GUI里通过QProcess输入密码，而不是在终端输入密码。
                # process = QProcess()
                # process.start('/bin/bash', ['-c', 'sudo umount /dev/'+disk_identifier+' && sudo /System/Volumes/Data/opt/homebrew/bin/ntfs-3g /dev/'+disk_identifier+' /Volumes/NTFS -olocal -oallow_other -o auto_xattr'])
                # process.writeData('password\n'.encode())  # 写入密码
                # process.waitForFinished()

                # # 方案三：在终端中运行`sudo python3 ntfs_mounter.py`，只需要一开始在终端输入一次密码就行，不用在程序运转时候输入密码了。
                # subprocess.run(['umount', '/dev/'+disk_identifier], check=True)
                # subprocess.run(['/System/Volumes/Data/opt/homebrew/bin/ntfs-3g', '/dev/'+disk_identifier, '/Volumes/NTFS', '-olocal', '-oallow_other', '-o', 'auto_xattr'], check=True)
                
                successInfo = f'磁盘{disk_identifier}已成功挂载，可以关闭GUI窗口。\n项目开源，欢迎共建: \nhttps://github.com/ksDreamer/ntfs-mounter'
                self.status_label.setText(successInfo) # 在GUI显示
                print(successInfo) # 在终端也显示
            except subprocess.CalledProcessError as e:
                errorInfo = f'挂载失败，原因如下: \n {e}'
                self.status_label.setText(errorInfo)
                print(errorInfo)
        else:
            self.status_label.setText('已取消')

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = NTFSMounter()
    ex.show()
    sys.exit(app.exec_())
