import 'dart:ui';
import 'package:flutter/material.dart';
import 'homepage.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Filmmaking Flutter',
      theme: ThemeData(
        primaryColor: Color(0xFF111111),
        backgroundColor: Color(0xFF111111),
        scaffoldBackgroundColor: Color(0xFF111111),
        secondaryHeaderColor: Colors.black,
        cardColor: Colors.grey[700],
        brightness: Brightness.dark,
        errorColor: Colors.red,
        indicatorColor: Colors.green,
        accentColor: Colors.white,
        fontFamily: 'BebasNeue',
        textTheme: TextTheme(
          title: TextStyle(fontSize: 48),
        ),
      ),
      home: HomePage(),
    );
  }
}
