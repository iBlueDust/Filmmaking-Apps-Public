import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
// import 'package:flare_flutter/flare_actor.dart';
import 'profileslide.dart';

class HomePage extends StatelessWidget {
  Widget build(BuildContext context) {
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

          // SizedBox.expand(
          //   child: FlareActor(
          //     'assets/vectors/bg_stripes.flr',
          //     fit: BoxFit.cover,
          //   ),
          // ),

          SafeArea(
            child: ProfileSlide(),
          ),
        ],
      ),
    );
  }
}
