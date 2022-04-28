import {NgModule} from '@angular/core';
import {ChatComponent} from '../chat/chat.component';
import {ChatConversationComponent} from '../chat/chat-conversation/chat-conversation.component';
import {ChatEmptyComponent} from '../chat/chat-empty/chat-empty.component';
import {CommonModule} from '@angular/common';
import {ChatRoutingModule} from '../chat/chat-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {IconModule} from '@visurel/iconify-angular';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {CometchatRoutingModule} from './cometchat-routing.module';
import {CometchatComponent} from './cometchat.component';
import {
    CometChatUI
} from '../../../../cometchat-pro-angular-ui-kit/CometChatWorkspace/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module';
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";


@NgModule({
    declarations: [CometchatComponent],
    imports: [
        CometchatRoutingModule,
        FlexLayoutModule,
        MatSidenavModule,
        ReactiveFormsModule,
        ScrollingModule,
        MatMenuModule,
        CometChatUI,
        PageLayoutModule
    ]
})
export class CometchatModule {
}
