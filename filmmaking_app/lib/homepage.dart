import 'package:flutter/material.dart';
// import 'package:flutter_svg/flutter_svg.dart';
import 'package:flare_flutter/flare_actor.dart';
import 'package:provider/provider.dart';
import 'profileslide.dart';
import 'store.dart';

class HomePage extends StatelessWidget {
  final _controller = PageController();

  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: <Widget>[
          //   SvgPicture.asset(
          //     'assets/vectors/background_stripes.svg',
          //     width: size.width,
          //     height: size.height,
          //     fit: BoxFit.cover,
          //   ),

          SizedBox.expand(
            child: FlareActor(
              'assets/vectors/bg_stripes.flr',
              fit: BoxFit.cover,
            ),
          ),

          SafeArea(
            child: ChangeNotifierProvider(
              create: (context) {
                // Create Store state management object
                var store = Store();

                // and initialize it (+ logging)
                store
                    .init(context)
                    .then((success) => print(success ? 'Store is initialized' : 'Failed to initialize Store'));

                return store;
              },
              child: ProfileSlide(),
            ),
          ),
        ],
      ),
    );
  }
}
