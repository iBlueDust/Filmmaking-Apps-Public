import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'profileslide.dart';

class HomePage extends StatelessWidget {
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      body: Stack(
        children: <Widget>[
          SvgPicture.asset(
            'assets/vectors/background_stripes.svg',
            width: size.width,
            height: size.height,
            fit: BoxFit.cover,
          ),
          SafeArea(
            child: ProfileSlide(),
          ),
        ],
      ),
    );
  }
}
