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
        primaryColor: Color(0xFF191919),
        backgroundColor: Color(0xFF191919),
        scaffoldBackgroundColor: Color(0xFF191919),
        secondaryHeaderColor: Color(0xFF161616),
        cardColor: Color(0xFF191919),
        buttonColor: Colors.grey[700],
        brightness: Brightness.dark,
        errorColor: Colors.red,
        indicatorColor: Colors.green,
        accentColor: Colors.white,
        textTheme: TextTheme(
          title: TextStyle(
            fontSize: 48,
            fontFamily: 'BebasNeue',
          ),
          display3: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
          body2: TextStyle(
            color: Colors.grey[700],
          ),
        ),
      ),
      home: HomePage(),
    );
  }
}
